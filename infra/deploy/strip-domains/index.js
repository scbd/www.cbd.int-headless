/**
 * strip-domains.js
 *
 * Loads HTML content from Drupal 10 MariaDB field tables, strips the domain
 * portion from absolute URLs whose hostname matches a provided list, and saves
 * the transformed HTML back to the database.
 *
 * Usage:
 *   node index.js --domains www.cbd.int --domains cbd.int [--dry-run] [--limit 10]
 *
 * DB connection is read from environment variables (or a .env file in the
 * parent directory):
 *   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
 */

import fs from 'fs'
import path from 'path'
import { createConnection } from 'mysql2/promise'
import { JSDOM } from 'jsdom'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BATCH_SIZE = 200

/** Drupal field tables to process by default: { table, column, pkCols } */
const DEFAULT_TABLES = [
  { table: 'node__body', column: 'body_value' },
  { table: 'node_revision__body', column: 'body_value' },
  { table: 'block_content__body', column: 'body_value' }
]

/** Attributes that may contain a single URL */
const URL_ATTRS = [
  ['a', 'href'],
  ['img', 'src'],
  ['script', 'src'],
  ['link', 'href'],
  ['iframe', 'src'],
  ['form', 'action'],
  ['video', 'src'],
  ['audio', 'src'],
  ['source', 'src']
]

/** Attributes that contain a srcset string (space-separated url + descriptor pairs) */
const SRCSET_ATTRS = [
  ['img', 'srcset'],
  ['source', 'srcset']
]

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

function parseArgs (argv) {
  const args = { domains: [], tables: [], dryRun: false, limit: null }

  for (let i = 2; i < argv.length; i++) {
    const flag = argv[i]
    if (flag === '--dry-run') {
      args.dryRun = true
    } else if (flag === '--domains' && argv[i + 1]) {
      args.domains.push(argv[++i].toLowerCase())
    } else if (flag === '--limit' && argv[i + 1]) {
      args.limit = parseInt(argv[++i], 10)
    } else if (flag === '--table' && argv[i + 1]) {
      const [table, column] = argv[++i].split(':')
      if (!table || !column) {
        console.error(`Invalid --table value "${argv[i]}" — expected format: tablename:columnname`)
        process.exit(1)
      }
      args.tables.push({ table, column })
    }
  }

  return args
}

// ---------------------------------------------------------------------------
// .env loader (simple key=value, no external dependency)
// ---------------------------------------------------------------------------

function loadDotEnv (envPath) {
  if (!fs.existsSync(envPath)) return
  const lines = fs.readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx < 0) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (!(key in process.env)) process.env[key] = val
  }
}

// ---------------------------------------------------------------------------
// URL transformation
// ---------------------------------------------------------------------------

/**
 * Given a URL string and the set of target hostnames, returns the stripped
 * relative URL if the hostname matches, otherwise returns null (no change).
 */
function stripDomain (urlStr, domains) {
  let parsed
  try {
    parsed = new URL(urlStr)
  } catch {
    return null // relative or malformed — leave as-is
  }
  if (!domains.has(parsed.hostname.toLowerCase())) return null
  console.log(`    stripping domain from URL: ${urlStr} → ${parsed.pathname + parsed.search + parsed.hash}`)

  return parsed.pathname + parsed.search + parsed.hash
}

/**
 * Process a srcset attribute value, stripping domains from each URL entry.
 * Returns the rewritten srcset string, or null if nothing changed.
 */
function stripDomainInSrcset (srcset, domains) {
  let changed = false
  const parts = srcset.split(',').map(entry => {
    const trimmed = entry.trim()
    const spaceIdx = trimmed.search(/\s/)
    const urlPart = spaceIdx < 0 ? trimmed : trimmed.slice(0, spaceIdx)
    const descriptor = spaceIdx < 0 ? '' : trimmed.slice(spaceIdx)
    const stripped = stripDomain(urlPart, domains)
    if (stripped !== null) {
      console.log(`    [srcset] stripping domain from URL: ${urlPart} → ${stripped}`)
      changed = true
      return stripped + descriptor
    }
    return entry
  })
  return changed ? parts.join(', ') : null
}

/**
 * Parse HTML with JSDOM, rewrite all matching URLs, and return the modified
 * innerHTML string. Returns null if no changes were made.
 */
function transformHtml (html, domains) {
  const dom = new JSDOM(`<body>${html}</body>`)
  const doc = dom.window.document
  const body = doc.body
  let changed = false

  for (const [selector, attr] of URL_ATTRS) {
    for (const el of body.querySelectorAll(`${selector}[${attr}]`)) {
      const original = el.getAttribute(attr)
      const stripped = stripDomain(original, domains)
      if (stripped !== null) {
        el.setAttribute(attr, stripped)
        changed = true
      }
    }
  }

  for (const [selector, attr] of SRCSET_ATTRS) {
    for (const el of body.querySelectorAll(`${selector}[${attr}]`)) {
      const original = el.getAttribute(attr)
      const stripped = stripDomainInSrcset(original, domains)
      if (stripped !== null) {
        el.setAttribute(attr, stripped)
        changed = true
      }
    }
  }

  return changed ? body.innerHTML : null
}

// ---------------------------------------------------------------------------
// Database processing
// ---------------------------------------------------------------------------

/**
 * Drupal field tables use a composite PK: bundle, deleted, entity_id,
 * revision_id, langcode, delta. Build a WHERE clause from those columns.
 */
const PK_COLS = ['bundle', 'deleted', 'entity_id', 'revision_id', 'langcode', 'delta']

function buildWhere (row) {
  return PK_COLS.map(col => `\`${col}\` = ?`).join(' AND ')
}

function pkValues (row) {
  return PK_COLS.map(col => row[col])
}

async function processTable (conn, tableSpec, domains, opts) {
  const { table, column } = tableSpec
  const { dryRun, limit } = opts

  // Count rows with any http content (fast pre-filter)
  const [[{ total }]] = await conn.execute(
    `SELECT COUNT(*) AS total FROM \`${table}\` WHERE \`${column}\` LIKE '%http%'`
  )

  if (total === 0) {
    console.log(`[${table}] 0 rows with http content — skipping`)
    return { scanned: 0, modified: 0 }
  }

  const effectiveLimit = limit !== null ? Math.min(limit, total) : total
  console.log(`[${table}] ${effectiveLimit} rows to scan`)

  let offset = 0
  let scanned = 0
  let modified = 0

  while (scanned < effectiveLimit) {
    const batchLimit = Math.min(BATCH_SIZE, effectiveLimit - scanned)
    const selectCols = [...PK_COLS, column].map(c => `\`${c}\``).join(', ')
    const [rows] = await conn.execute(
      `SELECT ${selectCols} FROM \`${table}\` WHERE \`${column}\` LIKE '%http%' LIMIT ? OFFSET ?`,
      [batchLimit, offset]
    )

    if (rows.length === 0) break

    for (const row of rows) {
      const original = row[column]
      if (!original) { scanned++; continue }

      const updated = transformHtml(original, domains)
      scanned++

      if (updated !== null) {
        modified++
        if (dryRun) {
          console.log(`  [DRY-RUN] ${table} entity_id=${row.entity_id} revision_id=${row.revision_id} lang=${row.langcode} — URLs rewritten`)
        } else {
          await conn.execute(
            `UPDATE \`${table}\` SET \`${column}\` = ? WHERE ${buildWhere(row)}`,
            [updated, ...pkValues(row)]
          )
        }
      }

      if (scanned % 50 === 0 || scanned === effectiveLimit) {
        process.stdout.write(`\r  [${table}] ${scanned}/${effectiveLimit} scanned, ${modified} modified   `)
      }
    }

    offset += rows.length
    if (rows.length < batchLimit) break
  }

  process.stdout.write('\n')
  return { scanned, modified }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main () {
  // Load .env from parent directory (infra/deploy/.env)
  const envPath = path.resolve(import.meta.dirname, '.env')
  loadDotEnv(envPath)

  const args = parseArgs(process.argv)

  if (args.domains.length === 0) {
    console.error('Error: at least one --domains value is required')
    console.error('  Example: node index.js --domains www.cbd.int --domains cbd.int')
    process.exit(1)
  }

  const domains = new Set(args.domains)
  const tables = args.tables.length > 0 ? args.tables : DEFAULT_TABLES

  console.log('Domains to strip:', [...domains].join(', '))
  console.log('Tables:', tables.map(t => `${t.table}.${t.column}`).join(', '))
  if (args.dryRun) console.log('DRY-RUN mode — no writes will be made')
  if (args.limit !== null) console.log(`Limit: ${args.limit} rows per table`)
  console.log()

  const conn = await createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || process.env.MYSQL_USER || 'drupal',
    password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQL_DATABASE || 'www-cms',
    charset: 'utf8mb4'
  })

  console.log('Connected to MariaDB\n')

  let totalScanned = 0
  let totalModified = 0

  for (const tableSpec of tables) {
    try {
      const { scanned, modified } = await processTable(conn, tableSpec, domains, {
        dryRun: args.dryRun,
        limit: args.limit
      })
      totalScanned += scanned
      totalModified += modified
      console.log(`  → ${scanned} scanned, ${modified} modified\n`)
    } catch (err) {
      if (err.code === 'ER_NO_SUCH_TABLE') {
        console.log(`[${tableSpec.table}] table does not exist — skipping\n`)
      } else {
        throw err
      }
    }
  }

  await conn.end()

  console.log('─'.repeat(50))
  console.log(`Total: ${totalScanned} rows scanned, ${totalModified} rows modified`)
  if (args.dryRun) console.log('(dry-run — no changes written)')
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})

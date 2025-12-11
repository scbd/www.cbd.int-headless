import crypto from 'crypto'
import { mkdir, readdir, stat, writeFile } from 'fs/promises'
import { readJson } from 'fs-extra'
import _ from 'lodash'
import path from 'path'
import * as url from 'url'
import type { Plugin } from 'vite'

const rootDirname = url.fileURLToPath(new url.URL('../', import.meta.url))

const i18nFolder = 'i18n'
const enFolder = `${i18nFolder}/en`

async function syncLocaleFiles (matchedFiles?: string[]): Promise<any[]> {
  let enFiles = matchedFiles ?? []
  if (enFiles.length === 0) {
    enFiles = await getAllDirectoryFiles(enFolder)
  }

  const filePromises = []

  for (let j = 0; j < enFiles.length; j++) {
    const enFile = enFiles[j]
    if (enFile != null) {
      filePromises.push(createLocaleFile(enFile))
    }
  }

  const flatData = await Promise.all(filePromises)

  return flatData
}

async function createLocaleFile (enFile: string): Promise<any> {
  const locales = ['ar', 'es', 'fr', 'ru', 'zh']
  const localeFilePromises = []

  // TODO check wny i18n fallback is not working, temp copy en props to lang objects
  const enData = await readJsonFile(enFile)

  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i] as string
    const langFilePath = enFile.replace(/[/\\]en[/\\]/, `/${locale}/`)

    const taskPromise = readJsonFile(langFilePath)
      .then((data) => {
        const hashData = compareKeyHashes(enData, data ?? {})
        return {
          [locale]: { ...hashData }
        }
      })

    localeFilePromises.push(taskPromise)
  }

  const localeData = await Promise.all(localeFilePromises)
  localeData.unshift({ en: enData })

  const distFilePath = enFile.replace(/[/\\]en[/\\]/, '/dist/')
  const flatData = localeData.reduce((a, b) => ({ ...a, ...b }), {})

  try {
    await mkdir(path.dirname(`${rootDirname}${distFilePath}`), { recursive: true })
    await writeFile(`${rootDirname}${distFilePath}`, JSON.stringify(flatData, null, 4), { encoding: 'utf8' })
  } catch (error) {
    console.error('Error writing locale dist file:', error)
  }

  return JSON.parse(JSON.stringify(flatData))
}

async function createLocaleEnFile (enVueFile: string): Promise<void> {
  const jsonFileName = `${rootDirname}${enFolder}/${enVueFile.replace(/\.vue$/, '.json')}`
  const fileStat = await stat(jsonFileName)
  if (fileStat.size === 0) {
    console.info(`********** Creating locale file for vue file ${enVueFile} ***********`)
    await mkdir(path.dirname(jsonFileName), { recursive: true })
    await writeFile(jsonFileName, JSON.stringify({}))
  }
}

async function readJsonFile (filePath: string): Promise<any> {
  try {
    const fileStat = await stat(filePath)
    if (fileStat.size > 0) {
      const parsedData = await readJson(`${rootDirname}${filePath}`, { encoding: 'utf8' })
      return parsedData
    }
  } catch (error) {
    console.error('Error reading JSON file:', error)
  }
}
// Remove from existing & valid keys in the localizedVersion from the base version;
function compareKeyHashes (baseMessages: Record<string, any>, localizedMessages: Record<string, any>): Record<string, any> {
  baseMessages = { ...baseMessages }

  const meta = localizedMessages['#meta']
  if (meta?.hashes != null) {
    delete localizedMessages['#meta']

    Object.entries(localizedMessages).filter(([, value]) => value != null && value !== '')
      .forEach(([key]) => {
        // if the key has hash only then continue with locale else use english
        if (baseMessages[key] != null && meta.hashes[key] != null) {
          let enHash = ''
          const enText = baseMessages[key]

          if (meta.algorithm === 'md5') {
            enHash = crypto.createHash('md5').update(enText).digest('hex')
          }

          // if locale hash matches the english text has then use locale text else english
          if (enHash?.length !== undefined && enHash.length > 0 && meta.hashes[key] === enHash) {
            _.unset(baseMessages, key)
          } else {
            _.unset(localizedMessages, key)
          }
        }
      })
  }

  Object.entries(localizedMessages).filter(([, value]) => value != null && value !== '').forEach(([key]) => {
    _.unset(baseMessages, key)
  })
  return localizedMessages
}

async function getAllDirectoryFiles (dir: string, options?: any): Promise <string[]> {
  options = options ?? {}

  let fileList: string[] = []
  const files = await readdir(dir)

  await Promise.all(files.map(async file => {
    try {
      const filePath = path.join(dir, file)
      const info = await stat(filePath)
      if (info.isDirectory()) {
        const subDirFiles = await getAllDirectoryFiles(filePath, options)
        fileList = [...fileList, ...subDirFiles]
      } else if (filePath !== '') {
        fileList.push(filePath)
      }
    } catch (error) {
      console.error('Error reading directory file:', error)
      // useLogger().error(e, file)
    }
  }))
  return fileList
}

export function viteSyncI18nFiles (options: any | undefined): Plugin {
  return {
    name: 'vite-plugin-sync-i18n-files',
    // async buildStart (a, b) {
    async buildStart () {
      console.debug('Syncing i18n files')

      await syncLocaleFiles()

      console.debug('Syncing i18n files finished')
    },
    handleHotUpdate: async function handleHotUpdate (_ref) {
      const file = _ref.file.replace(rootDirname, '')
      const server = _ref.server
      if (file.split('.').pop() === 'vue') {
        await createLocaleEnFile(file)
      };

      if (!file.includes(enFolder) || file.split('.').pop() !== 'json') return

      const messages = await syncLocaleFiles([file])
      server.ws.send({
        type: 'custom',
        event: 'locales-update',
        data: messages
      })
    }
  }
}

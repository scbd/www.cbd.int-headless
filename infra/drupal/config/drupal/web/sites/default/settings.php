<?php

// phpcs:ignoreFile

// Database connection skeleton — host/port/name/user/pass injected at runtime via settings.local.php
// Pre-deafult to MySql port 3306, but can be overridden by settings.local.php if needed.
$databases['default']['default'] = [
  'port'            => '3306',
  'prefix'          => '',
  'isolation_level' => 'READ COMMITTED',
  'driver'          => 'mysql',
  'namespace'       => 'Drupal\\mysql\\Driver\\Database\\mysql',
  'autoload'        => 'core/modules/mysql/src/Driver/Database/mysql/',
];

// Security — hash_salt injected at runtime from Docker secret hash_salt
$settings['update_free_access'] = FALSE;

// Services
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml';

// File system
$settings['file_scan_ignore_directories'] = ['node_modules', 'bower_components'];

// Entity updates
$settings['entity_update_batch_size']      = 50;
$settings['entity_update_backup']          = TRUE;
$settings['state_cache']                   = TRUE;
$settings['migrate_node_migrate_type_classic'] = FALSE;

// CBD.int customization

// Multilingual content + large JSON:API responses require more than the 256M default.
ini_set('memory_limit', '1024M');

// Outside the webroot — mounted via Docker volume (drupal_sync).
// In production this maps to a dedicated EFS mount point.
$settings['config_sync_directory'] = '/var/drupal/sync';

// Harden production: disable rebuild.php and keep file permission checks active.
$settings['rebuild_access']             = FALSE;
$settings['skip_permissions_hardening'] = FALSE;

// CSS/JS aggregation is handled by the CDN/reverse proxy — disable Drupal's own preprocessing.
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess']  = FALSE;

// Runtime overrides (DB credentials, Redis, trusted_host_patterns)
if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
  include $app_root . '/' . $site_path . '/settings.local.php';
}

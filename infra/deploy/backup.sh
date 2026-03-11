
echo backup db
ssh admin@cms.preview.drupal.www.infra.cbd.int 'sudo docker exec  cbd-int-drupal-preview drush sql:dump' > data/db.bak.sql

echo backup file
ssh admin@cms.preview.drupal.www.infra.cbd.int 'sudo docker exec cbd-int-drupal-preview tar czf - --transform "s|opt/drupal/web/sites/default/files/||" /opt/drupal/web/sites/default/files' > data/drupal_files.tar.gz

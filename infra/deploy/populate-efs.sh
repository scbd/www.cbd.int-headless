#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# populate-efs.sh — one-time EFS population for initial server deployment
#
# Mounts the EFS filesystem root via NFS inside a privileged Alpine container
# and extracts the Drupal files backup into the correct EFS paths.
#
# Usage:
#   EFS_FILES_DNS=<fs-id>.efs.<region>.amazonaws.com bash infra/deploy/populate-efs.sh
#
# Or with .env:
#   bash infra/deploy/populate-efs.sh
#
# Prerequisites:
#   - Docker running on an EC2 instance that has NFS connectivity to the EFS mount target
#   - infra/deploy/data/drupal_files.tar.gz present
# ---------------------------------------------------------------------------
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Source .env if present
if [ -f "${SCRIPT_DIR}/.env" ]; then
  set -a; source "${SCRIPT_DIR}/.env"; set +a
fi

: "${EFS_FILES_DNS:?EFS_FILES_DNS must be set (e.g. fs-xxxx.efs.us-east-1.amazonaws.com)}"

DATA_DIR="${SCRIPT_DIR}/data"

if [ ! -f "${DATA_DIR}/drupal_files.tar.gz" ]; then
  echo "Error: ${DATA_DIR}/drupal_files.tar.gz not found."
  exit 1
fi

echo "Populating EFS at ${EFS_FILES_DNS}..."
echo "  - Creating /www/files and /www/drupal/sync if absent"
echo "  - Extracting drupal_files.tar.gz into /www/files"

docker run --rm --privileged \
  -v "${DATA_DIR}:/data:ro" \
  alpine sh -c "
    set -e
    apk add --no-cache nfs-utils >/dev/null

    mkdir -p /mnt/efs
    mount -t nfs4 \
      -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport \
      ${EFS_FILES_DNS}:/ /mnt/efs

    # Ensure target directories exist on EFS
    mkdir -p /mnt/efs/www/files
    mkdir -p /mnt/efs/www/drupal/sync

    # Extract Drupal files
    echo 'Extracting drupal_files.tar.gz...'
    tar -xzf /data/drupal_files.tar.gz -C /mnt/efs/www/files

    # Set ownership to www-data (uid/gid 33)
    chown -R 33:33 /mnt/efs/www/files

    umount /mnt/efs
    echo 'Done.'
  "

echo ""
echo "EFS populated successfully."
echo "  /www/files        → drupal_files volume (drupal service)"
echo "  /www/drupal/sync  → drupal_sync volume (drupal service)"

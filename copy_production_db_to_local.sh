#!/bin/bash

# 1. Rename all the variables below
# PostgreSQL container ID on VPS
CONTAINER_ID="ea18906e755a"

# VPS SSH details
VPS_SSH="root@103.200.20.78"

# PostgreSQL details
PG_USERNAME="postgres"
PG_DATABASE="mimi_db"

# Local PostgreSQL details
LOCAL_PG_USERNAME="postgres"
LOCAL_PG_DATABASE="mimi_db"

NAME_FILE_BACKUP="mimi_backup_db"

# 2. Run file with command on your local machine:
# ./copy_production_db_to_local.sh
# It will requires password for VPS SSH and PostgreSQL

# Then the script will auto do the following steps:
# 2.1: Export the database inside postgres container on VPS
# 2.2: Copy the dump file from container to VPS
ssh $VPS_SSH "docker exec -t $CONTAINER_ID pg_dump -U $PG_USERNAME -d $PG_DATABASE -F c -f /home/$NAME_FILE_BACKUP.dump \
&& docker cp $CONTAINER_ID:/home/$NAME_FILE_BACKUP.dump /home
"

# Copy the dump file from VPS to local machine
scp $VPS_SSH:/home/$NAME_FILE_BACKUP.dump ~/Downloads/

# Import the database on local machine
pg_restore -U $LOCAL_PG_USERNAME -d $LOCAL_PG_DATABASE -F c --clean ~/Downloads/$NAME_FILE_BACKUP.dump

# Remove the dump file from the local machine
rm ~/Downloads/$NAME_FILE_BACKUP.dump

echo "Database copy completed!"

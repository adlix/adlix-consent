#!/bin/sh
set -e

mkdir -p /app/public/uploads

exec "$@"

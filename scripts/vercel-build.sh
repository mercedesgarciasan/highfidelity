#!/bin/sh
# Publishes one folder of the repo per Vercel project.
# SITE picks the folder: "prototipo" (app, default) or "admin".
set -e
SITE="${SITE:-prototipo}"
if [ ! -f "$SITE/index.html" ]; then
  echo "SITE=$SITE has no index.html" >&2
  exit 1
fi
rm -rf dist
mkdir -p dist
cp -R "$SITE"/. dist/
echo "Published $SITE/ to dist/"

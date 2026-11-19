#!/bin/sh
# Publishes one folder of the repo per Vercel project.
# SITE picks the folder: "prototipo" (app, default) or "admin".
# Shared assets (login, design system, brand) are copied next to it,
# so absolute paths like /shared/auth.js work the same here and locally.
set -e
SITE="${SITE:-prototipo}"
if [ ! -f "$SITE/index.html" ]; then
  echo "SITE=$SITE has no index.html" >&2
  exit 1
fi
rm -rf dist
mkdir -p dist
cp -R "$SITE"/. dist/
for d in shared vendor brand; do cp -R "$d" "dist/$d"; done
echo "Published $SITE/ (+ shared, vendor, brand) to dist/"

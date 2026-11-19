#!/bin/sh
# Builds the static site into dist/.
# By default it publishes the whole project: the home page at /, plus
# prototipo/, admin/, mockups/ and the shared assets they use.
# SITE=prototipo or SITE=admin publishes only that folder at / instead.
# Absolute paths like /shared/auth.js resolve the same here and locally.
set -e
rm -rf dist
mkdir -p dist
if [ -n "$SITE" ]; then
  if [ ! -f "$SITE/index.html" ]; then
    echo "SITE=$SITE has no index.html" >&2
    exit 1
  fi
  cp -R "$SITE"/. dist/
  for d in shared vendor brand; do cp -R "$d" "dist/$d"; done
  echo "Published $SITE/ (+ shared, vendor, brand) to dist/"
else
  cp index.html theme-preview.html dist/
  for d in prototipo admin mockups shared vendor brand assets; do
    if [ -d "$d" ]; then cp -R "$d" "dist/$d"; fi
  done
  echo "Published the whole site to dist/"
fi

#! /usr/bin/env bash

BASE_DIR=$(realpath `dirname $0`/..)
if [[ -n "$1" ]]; then
  BASE_DIR="$1"
fi
DIST_DIR="$BASE_DIR/dist"
KEY_FILE="$BASE_DIR/key.pem"

size(){
  case $(uname) in
    (Darwin | *BSD*)
      stat -Lf %z -- "$1";;
    (*) stat -c %s -- "$1"
  esac
}

(set -x; docker container run -t \
  -v "$BASE_DIR:$BASE_DIR:rw" \
  --rm treffynnon/alpine-chrome-extension-pack \
  /usr/bin/xvfb-runme chromium-browser \
    --no-sandbox \
    --disable-gpu \
    --pack-extension="$DIST_DIR" \
    --pack-extension-key="$KEY_FILE")

if [[ -z `size "$DIST_DIR.crx"` ]]; then
  echo "Packaging of Chrome .crx failed."
  exit 2;
else
  echo "Chrome .crx successfully built."
fi
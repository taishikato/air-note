#!/usr/bin/env bash

set -e

cd ./extension
pnpm run build:extension
cd ../

rm -rf copy

rm -rf ./extension/node_modules

mkdir copy

find ./ -not -name copy -not -name . -not -name .git -not -name .gitignore -not -name .zipignore -not -name extension -not -name deploy.sh -not -name extenson.zip -not -name deploy.sh -not -name clean.sh -not -name README.md -maxdepth 1 -exec cp -R {} copy \;

zip -r -q extension.zip ./copy

cd ./extension

pnpm i

cd ../

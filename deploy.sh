#!/usr/bin/env sh

set -e

yarn build:example

cd example


git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:eeezgame/VaUiElementui.git master:gh-pages

cd -

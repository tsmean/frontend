#!/usr/bin/env bash

git submodule init
git submodule update

for modulename in main resource hero
do
  cd ./${modulename}
  yarn install
  tsc
  cd ..
done

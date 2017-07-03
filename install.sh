#!/usr/bin/env bash

git submodule init
git submodule update

for modulename in main resource hero user
do
  cd ./${modulename}
  yarn install
  cd ..
  # cd src/app/${modulename}
  #yarn install
  #cd ../../../..
done

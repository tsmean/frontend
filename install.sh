#!/usr/bin/env bash

git submodule init
git submodule update

cd main
yarn install
cd ..

for modulename in resource hero user
do
  cd ./${modulename}
  yarn install
  cd src/app/${modulename}
  yarn install
  cd ../../../..
done

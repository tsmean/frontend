#!/usr/bin/env bash

# Note: Since my poor demo server is unable to cope with `ng build`, bundling is performed locally.

echo "Bundle Angular"
ng build --prod

if [ "${1}" == "test" ]; then
  rootdir="tsmean/testfe"
  server="ubuntu@52.59.71.133"
else
  rootdir="tsmean/fe"
  server="ubuntu@52.59.71.133"
fi

echo "Remove old directory"
ssh ${server} "rm -rf ${rootdir}"

echo "Upload new contents"
ssh ${server} "mkdir ${rootdir}"
scp -r dist "${server}:${rootdir}/dist"
scp server.js "${server}:${rootdir}/server.js"
scp package.json "${server}:${rootdir}/package.json"

echo "Install packages on server"
ssh ${server} "cd ${rootdir} && yarn install --prod"

# Special logic for test setup
if [ "${1}" == "test" ]; then
  echo "(Re-)Start server"
  ssh ${server} "forever stop ${rootdir}/server.js 9001"
  ssh ${server} "forever start ${rootdir}/server.js 9001"
else
  echo "(Re-)Start server"
  ssh ${server} "forever stop ${rootdir}/server.js 4243"
  ssh ${server} "forever start ${rootdir}/server.js 4243"
fi

echo "Done!"

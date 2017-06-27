#!/usr/bin/env bash

echo "Bundle Angular"
ng build --prod

if [ "${1}" == "test" ]; then
  rootdir="lernnavi/testfe"
  server="ubuntu@52.59.71.133"
else
  rootdir="lernnavi/fe"
  server="ubuntu@52.59.71.133"
fi

echo "Upload new contents"
ssh ${server} "mkdir ${rootdir}"
# First upload to special folder, so app is not interrupted (less downtime)
scp -r dist/* "${server}:${rootdir}"

echo "Done!"

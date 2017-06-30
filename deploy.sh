#!/usr/bin/env bash

echo "Bundle Angular"
ng build --prod

if [ "${1}" == "test" ]; then
  rootdir="tsmeandemo/testfe"
  server="ubuntu@35.158.213.131"
else
  rootdir="tsmeandemo/fe"
  server="ubuntu@35.158.213.131"
fi

echo "Upload new contents"
ssh ${server} "mkdir ${rootdir}"
# First upload to special folder, so app is not interrupted (less downtime)
scp -r dist/* "${server}:${rootdir}"

echo "Done!"

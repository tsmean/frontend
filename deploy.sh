#!/usr/bin/env bash
server="ubuntu@52.59.71.133"

echo "Bundle Angular"
ng build --prod

echo "Remove old directory"
ssh ${server} "rm -rf tsmean/fe"

echo "Upload new contents"
ssh ${server} "mkdir tsmean/fe"
scp -r dist "${server}:~/tsmean/fe/dist"
scp server.js "${server}:~/tsmean/fe/server.js"
scp -r package.json "${server}:~/tsmean/fe/package.json"

echo "Install packages on server"
ssh ${server} "cd tsmean/fe && npm install --production"

echo "(Re-)Start server"
ssh ${server} "forever stop tsmean/fe/server.js"
ssh ${server} "forever start tsmean/fe/server.js"

echo "Done!"

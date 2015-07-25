#!/bin/bash

echo "--	Demeteorization..."
demeteorizer
echo "--	Getting into the ./.demeteorized/ folder"
cd .demeteorized/
echo "--	Installing npm dependencies..."
npm i
echo -e "Ready to launch. Just type:\npm2 start phantom-pm2.json"
# echo -e "Ready to launch. Just type:\nMONGO_URL=mongodb://[user]:[pwd]@localhost:27017/phantom ROOT_URL=\"http://0.0.0.0\" PORT=8080 node .demeteorized/main"

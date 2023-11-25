#!/bin/zsh

cd ~/source/kanban

echo "###############################################"
echo git restore package-lock.json

git restore package-lock.json
RC=$?
if [ $RC -ne 0 ]; then
          echo '\n' $RC was returned.
          exit
fi

echo "###############################################"
echo git pull

git pull
RC=$?
if [ $RC -ne 0 ]; then
          echo '\n' $RC was returned.
          exit
fi

echo "###############################################"
echo npm i

npm i
RC=$?
if [ $RC -ne 0 ]; then
          echo '\n' $RC was returned.
          exit
fi

echo "###############################################"
echo npm update

npm update
RC=$?
if [ $RC -ne 0 ]; then
          echo '\n' $RC was returned.
          exit
fi

echo "###############################################"
echo npx prisma generate client

npx prisma generate client
RC=$?
if [ $RC -ne 0 ]; then
          echo '\n' $RC was returned.
          exit
fi

echo "###############################################"
echo npm run build

npm run build
RC=$?
if [ $RC -ne 0 ]; then
          echo '\n' $RC was returned.
          exit
fi

echo "###############################################"
echo pm2 restart Kanban

pm2 restart Kanban
RC=$?
if [ $RC -ne 0 ]; then
          echo '\n' $RC was returned.
          exit
fi

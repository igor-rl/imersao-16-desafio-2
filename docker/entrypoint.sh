#!/bin/bash

if [ ! -d node_modules ]; then
  npm install
fi

npm install -D prisma@5.7.0

npx prisma generate

npm run start:dev

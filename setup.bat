git pull
cd display
call npm ci
call npm run build
cd ../admin
call npm ci
call npm run build
cd ../server
call npm ci
call node ./node_modules/typescript/bin/tsc
pause
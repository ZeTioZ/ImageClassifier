@echo off
winget install --id OPenJS.NodeJS & cd .\GUI\ & npm install & npm audit fix & npm run dev --host
pause
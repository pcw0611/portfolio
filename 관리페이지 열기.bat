@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Portfolio admin server - close this window to stop.
start /b cmd /c "timeout /t 1 >nul & start http://localhost:8123/admin.html"
python serve.py

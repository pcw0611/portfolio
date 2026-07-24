@echo off
chcp 65001 >nul
cd /d "%~dp0"
git add -A
git commit -m "Update portfolio content"
git pull --rebase
git push
echo.
echo Done. Site updates in about 1 minute:
echo https://pcw0611.github.io/portfolio/
pause

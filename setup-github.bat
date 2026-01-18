@echo off
echo ================================================
echo   Outfred Survey - GitHub Setup Script
echo ================================================
echo.

REM Step 1: Configure Git User
echo [1/5] Setting up Git identity...
git config --global user.email "outfred@example.com"
git config --global user.name "Outfred"
echo ✓ Git identity configured
echo.

REM Step 2: Remove old remote
echo [2/5] Removing old remote...
git remote remove origin 2>nul
echo ✓ Old remote removed
echo.

REM Step 3: Add new remote
echo [3/5] Adding GitHub remote...
git remote add origin https://github.com/outfred/outfred-genz-survey.git
echo ✓ Remote added
echo.

REM Step 4: Commit changes
echo [4/5] Creating commit...
git add .
git commit -m "Initial commit: Outfred Gen-Z Survey with Neon DB integration"
echo ✓ Commit created
echo.

REM Step 5: Push to GitHub
echo [5/5] Pushing to GitHub...
echo.
echo If prompted for credentials:
echo - Username: your GitHub username
echo - Password: use Personal Access Token (NOT your password)
echo.
echo Get token from: https://github.com/settings/tokens
echo.
pause
git push -u origin main
echo.

echo ================================================
echo   ✓ Done! Check: https://github.com/outfred/outfred-genz-survey
echo ================================================
pause

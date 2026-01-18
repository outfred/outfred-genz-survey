@echo off
echo ================================================
echo   Neon Database Setup - Quick Guide
echo ================================================
echo.
echo Step 1: Go to Neon Console
echo    https://console.neon.tech
echo.
echo Step 2: Create New Project
echo    - Click "New Project"
echo    - Name: outfred-survey
echo    - Region: Choose closest to Egypt
echo.
echo Step 3: Open SQL Editor
echo    - Click on your project
echo    - Go to "SQL Editor" tab
echo.
echo Step 4: Run Database Schema
echo    - Copy ALL content from schema.sql
echo    - Paste in SQL Editor
echo    - Click "Run" or press Ctrl+Enter
echo.
echo Step 5: Get Connection String
echo    - Go to "Dashboard" tab
echo    - Find "Connection String"
echo    - Copy the full PostgreSQL URL
echo.
echo Step 6: Update .env.local
echo    - Open .env.local file
echo    - Replace DATABASE_URL with your connection string
echo.
echo ================================================
echo Ready? Press any key to open files...
echo ================================================
pause

echo.
echo Opening schema.sql...
start schema.sql

timeout /t 2 > nul

echo Opening .env.local...
start .env.local

timeout /t 2 > nul

echo Opening Neon Console in browser...
start https://console.neon.tech

echo.
echo ================================================
echo   Follow the steps above!
echo ================================================
pause

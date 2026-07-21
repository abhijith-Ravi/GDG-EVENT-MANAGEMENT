@echo off
REM GDG Event Management - Quick Startup Script
REM Run this from the project root directory

echo.
echo ================================================
echo GDG NMIT Event Management System
echo ================================================
echo.

REM Check if backend and frontend are running
netstat -ano | findstr :8080 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Backend appears to be running on port 8080
) else (
    echo [!] Backend is NOT running on port 8080
    echo.
    echo Starting backend in 5 seconds...
    timeout /t 5
    cd nmit
    mvn spring-boot:run
    cd ..
)

netstat -ano | findstr :5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Frontend appears to be running on port 5173
) else (
    echo [!] Frontend is NOT running on port 5173
)

echo.
echo ================================================
echo Access the application at:
echo http://localhost:5173
echo ================================================
echo.
pause

#!/bin/bash
# GDG Event Management - Backend Startup Script

cd nmit

echo ""
echo "================================================"
echo "Starting GDG Backend Server (Spring Boot)"
echo "================================================"
echo ""
echo "Server will be available at: http://localhost:8080"
echo ""
echo "To stop the server, press Ctrl+C"
echo ""

mvn spring-boot:run

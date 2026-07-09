@echo off
echo ===================================================
echo   DUTCH EDTECH BRIDGE - PORTAL BAŞLATICI
echo ===================================================
echo.
echo [1/2] FastAPI Backend Başlatılıyor (http://localhost:8000)...
start cmd /k "python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000"

echo [2/2] Vite React Frontend Başlatılıyor (http://localhost:5173)...
start cmd /k "cd frontend && npm run dev"

echo.
echo Portala erismek icin: http://localhost:5173
echo Backend API dokümantasyonu: http://localhost:8000/docs
echo.
echo ===================================================
echo Servisleri kapatmak icin acilan diger pencereleri kapatabilirsiniz.
echo Bu yukleyici penceresini kapatmak icin bir tusa basin...
pause > nul

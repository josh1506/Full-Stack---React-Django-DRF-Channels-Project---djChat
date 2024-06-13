Running app using uvicorn
uvicorn config.asgi:application --port 8000 --workers 4 --log-level debug --reload
--port 8000 - Listen to port 8000
--workers 4 - 4 worker process that uvicorn will spawn to handle incoming requests. Enabling this service to handle more traffic
--log-level debug - Give much information as possible in terms of information related to debugging and troubleshooting needs
--reload - Reload application after modifications. Default is OFF.
#!/bin/bash

# AI Interface Portal - Startup Script
# This script kills any process using port 2345 and starts the dev server

PORT=2345

echo "🚀 Starting AI Interface Portal..."

# Kill any process using the port
PID=$(lsof -ti :$PORT 2>/dev/null)
if [ -n "$PID" ]; then
  echo "⚠️  Port $PORT is in use by PID $PID. Killing..."
  kill -9 $PID 2>/dev/null
  sleep 1
  echo "✅ Port $PORT freed"
fi

# Start the dev server
echo "🌐 Starting server on http://localhost:$PORT"
PORT=$PORT npm run dev

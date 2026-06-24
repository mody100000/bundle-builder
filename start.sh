#!/bin/sh

# Start the Node.js Express backend server in the background
echo "Starting Node.js backend server..."
node /app/server/dist/server.js &

# Start Nginx in the foreground to keep the container running
echo "Starting Nginx frontend server..."
nginx -g "daemon off;"

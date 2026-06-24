# Stage 1: Build Frontend Client
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build Backend Server
FROM node:20-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
RUN npm run build

# Stage 3: Runtime
FROM node:20-alpine AS runtime
RUN apk add --no-cache nginx

# Create folders for nginx run files
RUN mkdir -p /run/nginx

# Copy static frontend build to Nginx serving directory
COPY --from=client-builder /app/client/dist /usr/share/nginx/html

# Setup Nginx Configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Setup Server app
WORKDIR /app/server
COPY --from=server-builder /app/server/dist ./dist
COPY --from=server-builder /app/server/public ./public
COPY --from=server-builder /app/server/src/data ./src/data
# Copy default config.json to the dist/data directory for runtime fallback
COPY --from=server-builder /app/server/src/data/config.json ./dist/data/config.json
COPY server/package*.json ./
RUN npm install --only=production

# Copy startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 80

CMD ["/bin/sh", "/app/start.sh"]

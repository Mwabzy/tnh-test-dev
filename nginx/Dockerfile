# Stage 1: Build React App
FROM node:24-alpine AS build

RUN apk add --no-cache python3 make g++

WORKDIR /app

# Enable corepack
RUN corepack enable

COPY ../frontend/package.json ../frontend/pnpm-lock.yaml ./
COPY ../frontend/.prod.env .env
# Install dependencies; guarantee reproducible builds in all environments using frozen-lockfile option
RUN pnpm install --frozen-lockfile
COPY ../frontend ./

# Buil the app
RUN pnpm build

# Stage 2: Nginx to serve the app and reverse proxy
FROM nginx:1.28.0-alpine AS production

# Install required packages
RUN apk add --no-cache openssl curl coreutils

# Copy config and startup script
COPY nginx/conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/manager.sh /manager.sh
RUN mkdir -p /var/www/.well-known/pki-validation
COPY nginx/conf/3D5DAEEA00D00E562F7470DDFF884748.txt /var/www/.well-known/pki-validation
# Copy frontend build from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Set permissions
RUN mkdir -p /vol/proxy && \
    chmod +x  /manager.sh && \
    chmod -R 755 /vol/proxy && \
    mkdir -p /var/cache/nginx && \
    mkdir -p /run

CMD ["/manager.sh"]
# CMD ["nginx", "-g", "daemon off;"]

# ---------- STAGE 1: BUILDER ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev \
    && npm cache clean --force

# Copy application code
COPY . .


# ---------- STAGE 2: PRODUCTION ----------
FROM node:22-alpine AS production

WORKDIR /app

# Copy application from builder
COPY --from=builder --chown=node:node /app ./

# Run as non-root user
USER node

EXPOSE 4000

CMD ["node", "src/server.js"]

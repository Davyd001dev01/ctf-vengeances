# -------- Deps --------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./

# usa npm ci se houver lock; senão, npm install
RUN if [ -f package-lock.json ]; then \
  npm ci --omit=dev --no-audit --no-fund --quiet; \
  else \
  npm install --omit=dev --no-audit --no-fund --quiet; \
  fi


RUN npm ci --no-audit --no-fund

# -------- Build --------
FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# -------- Runner --------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

# A saída 'standalone' inclui o server.js e os arquivos rastreados
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3001
CMD ["node", "server.js"]

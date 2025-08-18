# panel/Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
# se tiver package-lock.json, copie também para ativar npm ci
COPY package.json ./
# tenta npm ci; se não houver lock, cai em npm install
RUN npm ci --omit=dev || npm install --omit=dev

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
EXPOSE 3001
CMD ["sh","-lc","PORT=${PORT:-3001} node server.js"]

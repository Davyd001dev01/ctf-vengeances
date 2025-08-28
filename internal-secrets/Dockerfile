FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then \
  npm ci --omit=dev --no-audit --no-fund --quiet; \
  else \
  npm install --omit=dev --no-audit --no-fund --quiet; \
  fi
COPY server.js ./
ENV PORT=4000
EXPOSE 4000
CMD ["npm", "start"]

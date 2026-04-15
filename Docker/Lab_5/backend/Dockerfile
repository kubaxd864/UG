FROM node:20-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM deps AS test

WORKDIR /app
COPY . .
RUN npm ci
RUN npm test

FROM node:20-alpine AS production

ARG BUILD_DATE
ARG VERSION
ARG NODE_ENV=production

WORKDIR /app
ENV NODE_ENV=$NODE_ENV

LABEL org.opencontainers.image.created=$BUILD_DATE \
	org.opencontainers.image.version=$VERSION \
	org.opencontainers.image.title="product-backend"

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY index.js .

USER node
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://127.0.0.1:5000/health || exit 1

CMD ["node", "index.js"]
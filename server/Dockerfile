FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY server/package*.json ./
RUN npm ci --omit=dev

COPY server/src ./src
RUN mkdir -p uploads && chown -R node:node /app

USER node
EXPOSE 10000
CMD ["npm", "start"]

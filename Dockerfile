# ---- Build stage: export the web app and compile the server to dist/ ----
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build:server
RUN npm prune --omit=dev

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
COPY --from=build /app/dist ./dist
COPY --from=build /app/out ./out
COPY --from=build /app/node_modules ./node_modules
EXPOSE 4000
CMD ["node", "dist/server/index.js"]

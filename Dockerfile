FROM node:alpine AS build-step
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=build-step /dist/financial-web-app /usr/share/nginx/html
EXPOSE 80
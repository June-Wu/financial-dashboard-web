FROM node:alpine AS build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:alpine
COPY --from=build-step /app/docs /usr/share/nginx/html
EXPOSE 80
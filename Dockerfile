FROM node:alpine as buildstep
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
USER <user>[:<group>]
COPY --from=buildstep /app/dist/MyApp /usr/share/nginx/html
EXPOSE 8081
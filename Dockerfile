FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=build /app/build .
COPY .env .
COPY ./env.sh .

RUN chmod +x env.sh

# Открываем порт 80 для NGINX
EXPOSE 80

# Настраиваем замену переменных окружения при запуске контейнера и запускаем Nginx
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
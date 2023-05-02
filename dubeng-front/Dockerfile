FROM node:alpine AS build

WORKDIR /app


RUN npm install

COPY . /app

RUN npm run build

FROM nginx

EXPOSE 3000

# nginx proxy path 설정 파일
COPY ./nginx/default.conf /etc/nginx/conf.d/react.conf

COPY --from=build /app/build /usr/share/nginx/html

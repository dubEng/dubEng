FROM node:16-alpine AS builder

WORKDIR /app

COPY ../package.json /app

RUN npm install

# 어떤 파일이 이미지에 들어가야 하는지 
# 첫 번째 .은 이 프로젝트의 모든 폴더 및 파일들 (Dockerfile을 제외한)
# 두 번째 .은 파일을 저장할 컨테이너 내부 경로 (ex /app)
COPY ../ /app

RUN npm run build-storybook

FROM nginx

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

COPY --from=builer /app/storybook-static /usr/share/nginx/html


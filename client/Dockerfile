FROM node:10.18.0-alpine as stage_build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run build

FROM nginx:1.17.8-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=stage_build /app/build /usr/share/nginx/html

EXPOSE 3000

# CMD is already defined in nginx

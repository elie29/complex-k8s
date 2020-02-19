FROM node:10.18.0-alpine

ARG APP=/app

WORKDIR ${APP}

COPY package.json package-lock.json ./

RUN npm i

COPY . .

CMD ["npm", "start"]

FROM node:10-alpine

WORKDIR /app

RUN yarn global add @vue/cli
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
EXPOSE 8000
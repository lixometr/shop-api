FROM node:12.13-alpine As development

WORKDIR /app

COPY package*.json ./

RUN npm install 

# Do it in docker-compose 
# VOLUME [ ".:/app", "/app/node_modules" ]

EXPOSE 8080


CMD npm run start:dev



FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install --only=dev

COPY . .

RUN npm run build

CMD npm run start
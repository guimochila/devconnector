FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install pm2 -g
RUN npm install yarn -g
RUN yarn

EXPOSE 3000

CMD ["pm2-runtime", "index.js"]

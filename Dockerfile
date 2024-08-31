FROM node:20.9.0

WORKDIR .

COPY package.json .

RUN npm install

COPY . .

RUN npm run api:build
RUN npm run client:build

EXPOSE 5000

CMD ["npm", "start"]

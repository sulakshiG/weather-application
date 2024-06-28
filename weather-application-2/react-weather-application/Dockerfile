FROM node:20-alpine

WORKDIR /react-weather-applicaton

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
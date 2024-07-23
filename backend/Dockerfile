FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:backend

CMD [ "npm", "run", "start:backend" ]

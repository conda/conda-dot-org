FROM node:lts

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT npm run serve -- --build --port 3000 --host 0.0.0.0

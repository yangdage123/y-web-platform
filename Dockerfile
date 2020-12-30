FROM node:latest

COPY ./ ./y-web-platform

WORKDIR /y-web-platform

RUN yarn install

CMD yarn run start

EXPOSE 3000





FROM node:14-stretch-slim

ENV SERVICE_ROOT /service
RUN mkdir $SERVICE_ROOT
WORKDIR $SERVICE_ROOT

COPY . $SERVICE_ROOT

CMD node src/server.js

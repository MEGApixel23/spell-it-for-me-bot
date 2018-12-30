FROM keymetrics/pm2:8-alpine

ADD . /code
WORKDIR /code

CMD ["/bin/sh", ".start"]
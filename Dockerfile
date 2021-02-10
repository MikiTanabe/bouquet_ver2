# nodemodulesを指定
FROM node:10.15.3-alpine

WORKDIR /app

RUN npm install -g @vue/cli

COPY ./scripts/docker.start.sh /scripts/start.sh

RUN chmod +x /scripts/*

ENTRYPOINT ["/scripts/start.sh"]

#CMD ["npm", "run", "serve"] npm run serve 実行

#EXPOSE 8080

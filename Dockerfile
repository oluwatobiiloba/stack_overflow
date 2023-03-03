FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --development  --loglevel verbose && mv node_modules ../
COPY . .
EXPOSE 3535
RUN npm install pm2 -g
RUN chown -R node /usr/src/app
USER node
CMD ["pm2-runtime", "ecosystem.config.js"]


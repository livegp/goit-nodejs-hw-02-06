FROM node
WORKDIR /NodeJS/goit-nodejs-hw-02-06
COPY . .
ENV NODE_ENV production
RUN npm install
EXPOSE 3000
CMD [ "node", "./server.js" ]
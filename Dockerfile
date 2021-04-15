FROM node:14.15.1
WORKDIR /app
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 4001
ENTRYPOINT [ "node", "server.js" ]

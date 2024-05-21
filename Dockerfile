# Specify the base image
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y postgresql-client
COPY . .
EXPOSE 12345

CMD ["npm", "run", "dev"]

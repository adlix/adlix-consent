FROM node:20-alpine

WORKDIR /app

# Build-Tools fuer native Module
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p public/uploads

EXPOSE 1337
CMD ["npm", "run", "develop"]

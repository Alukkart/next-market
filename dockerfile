
FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm i
EXPOSE 8888
COPY . .
RUN npm run build
RUN npx prisma db push
RUN npx prisma db seed
CMD [ "npm", "start" ]
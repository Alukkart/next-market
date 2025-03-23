
FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm i
EXPOSE 3000
COPY . .
RUN npm run build
RUN npx prisma db push
RUN npx prisma db seed
CMD [ "npm", "start" ]
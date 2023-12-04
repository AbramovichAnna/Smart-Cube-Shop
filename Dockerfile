FROM node:17-alpine
WORKDIR /smart_cube
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
FROM node:20.12.2-alpine
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && adduser -S app -G nodejs -u 1001

COPY package*.json ./
RUN npm i

COPY . .

ENV \
  PASSWORD_DB="" \
  SERVER_NAME="" \
  USER_DB="" \
  NAME_DB="" \
  PORT_DB="" \
  PORT_EXPRESS="" \
  HOST_EXPRESS=""


USER 1001
EXPOSE 6000

CMD ["npm", "run", "start"]

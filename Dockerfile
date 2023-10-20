FROM node:lts-alpine
RUN apk update and apk add yarn
WORKDIR /app

COPY . .
EXPOSE 5173

RUN yarn
CMD ["yarn", "run", "dev"]


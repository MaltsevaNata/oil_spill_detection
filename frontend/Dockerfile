FROM node:12-buster as build
WORKDIR /usr/app
COPY package.json .
COPY yarn.lock .
RUN yarn global add rimraf
RUN yarn install --production=false
COPY . .
RUN yarn build

FROM nginx:alpine as production
RUN apk add curl
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
COPY --from=build /usr/app/build /usr/share/nginx/html

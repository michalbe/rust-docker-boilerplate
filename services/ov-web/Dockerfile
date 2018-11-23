FROM node:alpine as builder
WORKDIR /usr/src/app
RUN mkdir webroot
COPY src ./src
COPY .babelrc .
COPY package.json .
COPY webpack.config.js .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY webroot/index.html /usr/share/nginx/html/index.html
COPY --from=builder /usr/src/app/webroot /usr/share/nginx/html

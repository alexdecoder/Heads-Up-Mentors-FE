FROM node:latest as build

WORKDIR /headsup-f

COPY ./ /headsup-f/

RUN npm install
RUN npm run build --prod
FROM nginx:latest
COPY --from=build /headsup-f/dist/headsup-f /usr/share/nginx/html
COPY ./nginx.conf /data/conf/nginx.conf
EXPOSE 80
FROM node:alpine as builder

WORKDIR /var/lib/app/
COPY . /var/lib/app/
ENV PATH /app/node_modules/.bin:$PATH
CMD ["rm", "-rf", "node_modules"]
ARG PUBLIC_URL
RUN yarn install --frozen-lockfile
RUN yarn run build

FROM nginx:1.17.7

COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /var/lib/app/build/ /var/www/

FROM node:13.12.0-alpine as build
WORKDIR /app 
COPY . /app/
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]

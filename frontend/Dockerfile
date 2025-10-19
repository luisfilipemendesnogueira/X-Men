FROM node:25-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --unsafe-perm
COPY . .
RUN chmod +x node_modules/.bin/* node_modules/@esbuild/linux-x64/bin/esbuild
RUN npm run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

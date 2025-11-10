# ---- Build Stage ----
FROM node:22-alpine as build

WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the code
COPY . .

# build the Vite app
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine

# copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# expose port inside container
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]

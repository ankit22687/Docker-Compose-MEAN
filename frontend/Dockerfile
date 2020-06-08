# Create image based on the official Node 10 image from dockerhub
FROM node:10 as builder

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY ./package.json ./

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . .

# build files for production

RUN npm run build

# Create image for nginx

FROM nginx

# Expose port 
EXPOSE 4200

# copy default.conf from local to container's nginx conf folder
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# copy compiled version of app to nginx html
COPY --from=builder /app/dist /usr/share/nginx/html 
# Stage 1: Build the React application
# Use a Node image to compile the React code
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application (this generates the static files in the 'build' folder)
RUN npm run build

# Stage 2: Serve the application with Nginx
# Use a lightweight Nginx image to serve the static content
FROM nginx:stable-alpine

# Copy the built files from the previous stage to the Nginx serving directory
# The 'build' folder is created by the 'npm run build' command
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80

# Nginx starts automatically by default
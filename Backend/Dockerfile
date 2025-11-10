# Use official Node 22 image
FROM node:22

# Set working directory inside container
WORKDIR /app

# Copy Node dependency definitions
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy only backend Node code (Python microservice ignored via .dockerignore)
COPY . .

# Expose the port your Express server uses
EXPOSE 7000

# Start the server in production mode
CMD ["node", "index.js"]

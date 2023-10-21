# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app/server

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose both ports (3011 and 3012) in Node.js is running on
EXPOSE 3011
EXPOSE 3012

# Start the Node.js app
CMD ["node", "index.js"]

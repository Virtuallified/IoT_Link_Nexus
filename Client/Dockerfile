# Use the official Node.js image
FROM node:18-alpine

# Create the working directory
WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js is running on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]

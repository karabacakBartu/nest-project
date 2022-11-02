# Base image
FROM node:18.6.0

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY . .

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3000

# Start the server using the production build
CMD ["node","dist/main.js"]

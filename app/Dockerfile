FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY src/ /usr/src/app
COPY package*.json /usr/src/app

# Install dependencies
RUN npm install -g nodemon
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the API port
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "run", "dev"]
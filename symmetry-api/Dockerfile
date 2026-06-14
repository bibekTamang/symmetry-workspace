# 1. Start from an official Node.js runtime environment image
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first to optimize installation caching
COPY package.json yarn.lock ./

# 4. Install dependencies inside the container
RUN yarn install --frozen-lockfile

# 5. Copy the rest of your local backend source code into the container
COPY . .

# 6. Expose the port your Express server listens on
EXPOSE 3000

# 7. The command to run your app inside the container
CMD ["yarn", "dev"]
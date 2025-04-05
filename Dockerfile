# 1. Use Node image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependencies and install
COPY package*.json ./
RUN npm install

# 4. Copy source files
COPY . .

# 5. Build the TypeScript code
RUN npm run build

# 6. Expose app port (adjust if needed)
EXPOSE 8000

# 7. Start the built app
# Run the built app with path aliases support
CMD ["node", "-r", "tsconfig-paths/register", "dist/src/server.js"]


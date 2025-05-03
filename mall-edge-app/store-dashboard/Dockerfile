# Use official Node image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install deps and build
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Use a lightweight web server to serve the static files
FROM nginx:alpine

# Copy built frontend to nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]

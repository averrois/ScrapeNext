# Use the official Bun image as the base
FROM bun:latest

# Set a working directory
WORKDIR /app

# Copy your project files
COPY package*.json ./

# Install dependencies using bun install
RUN bun install

# Copy the remaining project files
COPY . .

# Expose server port (you can adjust this port if needed)
EXPOSE 3000

# Start the server with bun index.ts
CMD ["bun", "run", "index.ts"]


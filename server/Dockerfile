FROM oven/bun

WORKDIR /app

COPY package*.json ./

COPY . .

RUN bun install

# Expose port for Bright Data proxy (if needed)
EXPOSE 22225

CMD ["bun", "index.ts"]

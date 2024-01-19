# server/Dockerfile
FROM oven/bun

WORKDIR /app

COPY package*.json ./

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "index.ts"]

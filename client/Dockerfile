# client/Dockerfile
FROM oven/bun

WORKDIR /app

COPY package*.json ./

COPY . .

RUN bun install

EXPOSE 5173

CMD bun run dev

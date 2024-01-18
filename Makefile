# Install dependencies
install-dependencies:
	cd client && bun install
	cd server && bun install

deploy: install-dependencies
	cd client && bun run build

.PHONY: install-dependencies deploy
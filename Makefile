install-dependencies: install-bun
	cd client && bun install
	cd server && bun install

run-development: install-dependencies
	cd client && bun run dev &
	cd server && bun index.ts &

deploy: install-dependencies run-development
	# Add any additional deployment steps here

.PHONY: install-bun install-dependencies run-development deploy
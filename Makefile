install-dependencies: install-bun
	cd client && bun install
	cd server && bun install

run-development: install-dependencies
	# Use production build for client-side
	cd client && bun build

	# Gracefully terminate server-side after a delay
	cd server && bun index.ts & sleep 10 && pkill bun

deploy: install-dependencies
	# Generate production-ready client-side build
	cd client && bun build

	# Deploy server-side code (adjust as needed)
	# Options: Netlify Functions, container deployment, etc.

.PHONY: install-bun install-dependencies run-development deploy
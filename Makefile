# Install dependencies
install-dependencies:
	cd client && npm install
	cd server && npm install

# Deploy server-side code (adjust based on your chosen platform)
deploy: install-dependencies
	# Build server bundle (e.g., npm run build:prod)
	# Deploy built bundle to Netlify functions directory
	# Set necessary environment variables for Netlify

.PHONY: install-dependencies deploy
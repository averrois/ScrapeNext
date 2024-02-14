# Define paths and variables
BUN_PATH ?= $(shell which bun)
BUN_INSTALL_URL = https://install.bun.sh

# Check if Bun is installed
ifeq ($(BUN_PATH),)
  # Bun is not installed, download and install
  download:
    @curl -o install.sh $(BUN_INSTALL_URL) && \
      sh install.sh -t /usr/local/bin
  # Ensure build completes dependency installation
else
  # Bun is installed, proceed with dependencies
  install:
    @bun install
endif

# Start the server
run:
  @bun run index.ts

# Clean up downloaded installer
clean:
  @rm install.sh

# Convenience alias for common tasks
all: build run

# Help message
help:
  @echo "Available commands:"
  @echo "  download   Download and install Bun if not present."
  @echo "  install    Install project dependencies using Bun."
  @echo "  run        Start the Bun server with index.ts."
  @echo "  clean      Remove downloaded Bun installer."
  @echo "  all        Install dependencies and run the server."
  @echo "  help       Display this help message."


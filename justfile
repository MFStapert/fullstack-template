# Default target that lists all available commands in this justfile
default:
  just --list --unsorted

# Install necessary tools and dependencies
install:
 asdf install
 pnpm install

# Clean up the project and docker system
clean:
 pnpm run clean

# Format the codebase with prettier and eslint
format:
 pnpm run "/^format:.*/"

# Check the codebase with prettier and eslint
check:
 pnpm run "/^check:.*/"

# Run node tests
test:
 pnpm run -r test

# Build node apps
build:
 pnpm run -r build

# Start the development environment using docker and run start scripts
start:
 docker compose -f docker-compose.yml -f docker-compose.local.yml up -d
 pnpm run -r "/^start.*/"

# Run Playwright end-to-end tests in watch mode
playwright:
 pnpm --filter=e2e run e2e:watch

# Start the full environment
docker:
 docker compose --profile full up -d --build

# Start the full environment and run e2e tests
e2e:
 docker compose --profile full --profile e2e up --build --attach e2e --exit-code-from=e2e

# Shut down docker containers and clean up
down:
 docker compose --profile full down --remove-orphans --volumes

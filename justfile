# Default target that lists all available commands in this justfile.
default:
  just --list

# Install necessary tools and dependencies.
install:
 asdf install
 pnpm install

# Clean up the project and Docker system.
clean:
 pnpm run clean
 docker system prune -a -f
 docker image prune -a -f

# Format the codebase with prettier and eslint
format:
 pnpm run "/^format:.*/"

# Check the codebase with prettier and eslint
check:
 pnpm run "/^check:.*/"

# Run tests for the project.
test:
 pnpm run -r test

# Build the project.
build:
 pnpm run -r build

# Start the development environment using Docker and run start scripts.
start:
 docker compose -f docker-compose.yml -f docker-compose.local.yml up -d
 pnpm run -r "/^start.*/"

# Run Playwright end-to-end tests in watch mode.
playwright:
 pnpm --filter=e2e run e2e:watch

# Build and start all services
docker:
 docker compose --profile full up -d --build

# Start the full environment including end-to-end testing setup.
e2e:
 docker compose --profile full --profile e2e up --build --wait

# Shut down Docker containers and clean up.
down:
 docker compose --profile full down --remove-orphans --volumes

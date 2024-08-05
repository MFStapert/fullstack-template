# Monorepo template

Template for fullstack setup, includes:

- backend (nestjs)
- frontend (angular)
- reverse proxy (caddy)

The project can be managed with single commands using `just`.

To view all available commands, run `just`.

## System requirements

- [asdf](https://asdf-vm.com/)
- [docker](https://www.docker.com/get-started/)

## Installation

- `asdf plugin add just`
- `asdf plugin add nodejs`
- `asdf plugin add pnpm`
- `asdf install`
- `just install`

## Run

- Start Development Environment:

`just start`

This command starts the infrastructure containers, as well as the frontend and backend in node.

- Build and Start All Containers:

`just docker`

This command builds and starts all containers, including the frontend, backend, and reverse proxy.

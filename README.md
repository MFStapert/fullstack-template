# Monorepo template

Template for fullstack setup, includes:

- database (postgres)
- backend (nestjs)
- frontend (angular)
- reverse proxy (caddy)
- e2e (playwright)

The project can be managed with single commands using `just`.

To view all available commands, run `just` after following the installation instructions

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

`just infra`

This command starts the infrastructure containers.

`just start`

This command starts front and backend.

`just docker`

This command builds and starts all containers, including the frontend, backend, and reverse proxy.

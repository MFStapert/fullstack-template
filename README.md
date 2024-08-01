# Monorepo template

Template for monorepo setup in node

## System requirements

- asdf
- docker

## Install dependencies

- `asdf plugin add just`
- `asdf plugin add nodejs`
- `asdf plugin add pnpm`
- `just install`

## Build

`just build` to build docker containers

## Run

`just run-infra` to run project infrastructure

`just run-full` to run project in docker (requires build)

`just start` to start frontend and backend

## Test

`just test` to run all tests

## E2E

`just run-e2e` to e2e project in docker (requires build)

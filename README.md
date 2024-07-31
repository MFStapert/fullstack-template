# Monorepo template

Template for monorepo setup in node

## System requirements

- asdf
- docker

## Install dependencies

- `asdf plugin add nodejs`
- `asdf plugin add just`
- `asdf install`
- `just install`

## Build

`just build` to build docker containers

## Run

`just run-infra` to run project infrastructure

`just run-full` to run project in docker (requires build)

`npm run start` in frontend folder for frontend

`npm run start` in backend folder for backend

## Test

`npm run test` in backend to test backend

## E2E

`just e2e` to e2e project in watch mode

`just run-e2e` to e2e project in docker (requires build)

# Monorepo template

Template for monorepo setup in node

## System requirements

- asdf
- docker

## Install dependencies

- asdf plugin add nodejs
- asdf plugin add just
- asdf install
- `just install`

## Run

`just run-infra` to run project infrastructure

`npm run start:frontend` in frontend folder for frontend

`npm run start:backend` in backend folder for backend

### Docker

`just run-full` to run project in docker (requires build)

## Build

`just build` to build docker containers

## Test

`npm run unit:backend` in backend to unit test backend

`npm run test:backend` in backend to e2e test backend

## E2E

`just run-e2e` to e2e project in docker (requires build)

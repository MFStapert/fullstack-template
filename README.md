# Monorepo template

Template for fullstack setup

## System requirements

- asdf
- docker

## Install dependencies

- `asdf plugin add just`
- `asdf plugin add nodejs`
- `asdf plugin add pnpm`
- `just install`

## Formatting

`just check` to run all static checks

`just format` to format all files

## Build

`just build` to build node apps

## Test

`just test` to run all tests

## Run

`just start` to start infra containers and frontend+backend in node

`just docker` to build and start all containers

## E2E

`just e2e` to build all containers and run e2e

default:
  just --list

run-infra:
	just infra/run-infra

run-full:
	just infra/run-full

down:
	just infra/down

build:
	just frontend/build-docker
	just backend/build


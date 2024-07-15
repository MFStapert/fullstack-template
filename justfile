default:
  just --list

run-infra:
	just infra/run-infra

run-full:
	just infra/run-full

down:
	just infra/down

build:
	just frontend/build-cms-docker
	just frontend/build-site-docker
	just backend/build


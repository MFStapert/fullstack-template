default:
  just --list

install:
 npm ci
 just e2e/install
 just frontend/install

clean:
 just e2e/clean
 just frontend/clean

build:
	just e2e/build-docker
	just frontend/build-docker
	just backend/build

run-infra:
	just infra/run-infra

run-full:
	just infra/run-full

run-e2e:
	just infra/run-e2e

down:
	just infra/down

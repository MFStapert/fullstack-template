default:
  just --list

install:
 npm ci
 just backend/install
 just e2e/install
 just frontend/install

clean:
 rm -rf node_modules
 just backend/clean
 just e2e/clean
 just frontend/clean

format:
 npm run format:prettier
 npm run format:eslint

check:
  npm run check:prettier
  npm run check:eslint

build:
	just backend/build
	just e2e/build
	just frontend/build

run-infra:
	docker compose -f docker-compose.yml -f docker-compose.local.yml up -d

run-full:
	docker compose --profile full up -d

run-e2e:
	docker compose --profile full --profile e2e up --wait

down:
	docker compose --profile full down --remove-orphans --volumes


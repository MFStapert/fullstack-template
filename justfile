default:
  just --list

install:
 asdf install
 pnpm install

clean:
 pnpm run clean
 docker system prune -a -f
 docker image prune -a -f

format:
 pnpm run "/^format:.*/"

check:
 pnpm run "/^check:.*/"

test:
 pnpm run -r test

build:
 pnpm run -r build

start:
 docker compose -f docker-compose.yml -f docker-compose.local.yml up -d
 pnpm run -r "/^start.*/"

playwright:
 pnpm --filter=e2e run e2e:watch

docker:
 docker compose --profile full up -d --build

e2e:
 docker compose --profile full --profile e2e up --build --wait

down:
 docker compose --profile full down --remove-orphans --volumes

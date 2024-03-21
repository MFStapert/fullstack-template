run:
	docker compose up -d

run-be:
	$(MAKE) -C backend run

build:
	npm run build cms
	$(MAKE) -C frontend build-cms
	npm run build site
	$(MAKE) -C frontend build-site
	$(MAKE) -C backend build

down:
	docker compose down --remove-orphans --volumes

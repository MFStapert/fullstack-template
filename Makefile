run:
	docker compose up -d

run-be:
	$(MAKE) -C backend run

build-fe:
	npm run build cms
	$(MAKE) -C frontend build-cms
	npm run build site
	$(MAKE) -C frontend build-site

stop:
	docker compose stop

down:
	docker compose down --remove-orphans --volumes

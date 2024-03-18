run:
	docker compose up -d

run-be:
	$(MAKE) -C backend run

stop:
	docker compose stop

down:
	docker compose down --remove-orphans --volumes

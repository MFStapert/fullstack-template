run-infra:
	docker compose -f docker-compose.yml -f docker-compose.local.yml up -d

run-full:
	docker compose --profile full up -d

down:
	docker compose --profile full down --remove-orphans --volumes

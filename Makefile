run-infra:
	$(MAKE) -C infra run-infra

run-be:
	$(MAKE) -C backend run

run-full:
	$(MAKE) -C infra run-full

down:
	$(MAKE) -C infra down

build:
	npm run build cms
	$(MAKE) -C frontend build-cms
	npm run build site
	$(MAKE) -C frontend build-site
	$(MAKE) -C backend build


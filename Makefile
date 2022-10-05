build-dev:
	docker build -t kerbb-admin-dev -f Dockerfile.dev .

build-local:
	docker build \
		-t kerbb-admin-production:local \
		-f Dockerfile.production .

build-production:
	docker build \
		-t kerbb-admin-production:production \
		-f Dockerfile.production .

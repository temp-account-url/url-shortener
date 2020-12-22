.PHONY: $(MAKECMDGOALS)

ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
APP_IMAGE_NAME:=kmera_task_shortener

# `make setup` will be used after cloning or downloading to fulfill
# dependencies, and setup the the project in an initial state.
# This is where you might download rubygems, node_modules, packages,
# compile code, build container images, initialize a database,
# anything else that needs to happen before your server is started
# for the first time
setup:
    # to be sure that we dont have old images in cache ( sometimes it's  a cause of MySQL auth error)
	(cd ./docker && docker-compose rm -v -f)
	(cd ./docker && docker-compose build)
	# I know it's not pretty,
	# usually I use  docker multistage build to download sources from repo and build it
	# but here just for presentation purposes we have sources in mounted volume and
	# it need to be simple so :
	docker run -ti --entrypoint "" -v $(ROOT_DIR)/packages:/var/app $(APP_IMAGE_NAME)  bash -c "cd /var/app/backend  && yarn install && yarn build"
	docker run -ti --entrypoint "" -v $(ROOT_DIR)/packages:/var/app $(APP_IMAGE_NAME)  bash -c "cd /var/app/frontend  && yarn install && yarn build"

# `make server` will be used after `make setup` in order to start
# an http server process that listens on any unreserved port
#	of your choice (e.g. 8080). 
server:
	(cd ./docker && docker-compose up);


# `make test` will be used after `make setup` in order to run
# your test suite.
test:
	docker run -v $(ROOT_DIR)/packages:/var/app $(APP_IMAGE_NAME) test-with-front

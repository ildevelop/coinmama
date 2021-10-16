################################################################################
# Makefile for Coinmana Repository : docker setup, commands
################################################################################

# Prefer bash shell
export SHELL=/bin/bash
mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
CWD := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))
## Define repositories dependencies paths

self := $(abspath $(lastword $(MAKEFILE_LIST)))
parent := $(dir $(self))

ifneq (,$(VERBOSE))
    override VERBOSE:=
else
    override VERBOSE:=@
endif


.PHONY: shutdown
shutdown:
	$(VERBOSE) docker-compose down
.PHONY: redis
redis:
	$(VERBOSE) docker-compose up redis
.PHONY: server
server:
	$(VERBOSE) docker-compose run --service-ports server
.PHONY: startapp
startapp:
	$(VERBOSE) docker-compose up -d redis 
	$(VERBOSE) sleep 5
	$(VERBOSE) docker-compose up cron server
.PHONY: buildapp
buildapp:
	$(VERBOSE) npm run build
	$(VERBOSE) docker-compose build


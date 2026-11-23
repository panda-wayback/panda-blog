.DEFAULT_GOAL := help

.PHONY: help install start build serve clear clean typecheck version deploy

help:
	@echo "make install               安装依赖"
	@echo "make start                 本地预览"
	@echo "make build                 生产构建"
	@echo "make serve                 预览构建结果"
	@echo "make clear                 清缓存"
	@echo "make typecheck             类型检查"
	@echo "make version VERSION=x.y   发布文档版本"
	@echo "make deploy                部署"

install:
	npm install

start:
	npm start

build:
	npm run build

serve:
	npm run serve

clear:
	npm run clear

clean: clear

typecheck:
	npm run typecheck

version:
	@test -n "$(VERSION)" || { echo "usage: make version VERSION=1.0.0"; exit 1; }
	npm run docs:version -- $(VERSION)

deploy:
	npm run deploy

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
	@branch="$${DEPLOYMENT_BRANCH:-gh-pages}"; \
	if ! git ls-remote --exit-code --heads origin "$$branch" >/dev/null 2>&1; then \
		echo "creating $$branch"; \
		blob=$$(printf 'placeholder\n' | git hash-object -w --stdin); \
		tree=$$(printf '100644 blob %s\tREADME.md\n' "$$blob" | git mktree); \
		commit=$$(git commit-tree "$$tree" -m "Initial $$branch"); \
		git push origin "$${commit}:refs/heads/$$branch"; \
	fi
	USE_SSH=$${USE_SSH:-true} npm run deploy

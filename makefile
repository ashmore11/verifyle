setup:
	git config core.fileMode false
	make cli_setup
	npm install

watch:
	NODE_ENV=development gulp

release:
	NODE_ENV=production gulp build

stylus:
	stylus -w src/stylus/ --out public/css/
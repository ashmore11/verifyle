require 'coffee-script'

module.exports =
	
	output:
		filename: 'app.js'
	
	module:
		loaders: [
			{ test: /\.coffee$/, loader: 'coffee-loader' },
			{ test: /\.jade$/,   loader: 'jade-loader' }
		]
	
	resolve:
		extensions: [ '', '.js', '.coffee' ]
		alias:
			elements    : __dirname + '/src/coffee/elements'
			utils       : __dirname + '/src/coffee/utils'
			helpers     : __dirname + '/src/coffee/helpers'
			settings    : __dirname + '/src/coffee/settings.coffee'

	node:
		fs: 'empty'

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
			utils       : __dirname + '/src/coffee/utils'
			models      : __dirname + '/src/coffee/models'
			views       : __dirname + '/src/coffee/views'
			controllers : __dirname + '/src/coffee/controllers'
			templates   : __dirname + '/src/templates'

	node:
		fs: 'empty'

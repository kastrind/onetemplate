var path = require('path');

module.exports = {
	entry: {
		app: "./src/script/script.js"
	},
	output: {
		path: path.resolve(__dirname, "./dist/script"),
		filename: "script.js"
	},
	mode: 'development',
	devtool: 'source-map',
	module: {
			rules: [
					{
							test: /\.js$/,
							exclude: /node_modules/,
							include : [
							'./src/script',
							],
							use: {
									loader: 'babel-loader',
									options: {
											modules: true,
											presets: ['env',
													{
															"targets": {
																	"node": "current"
															}
													}
											]
									}
							}
					}
			]
	}
}

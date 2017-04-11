module.exports = {
	entry: './client.js',
	output: {
		filename: 'bundle.js',
		path: 'styles' // public in tutorial
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react']
				}
			}
		]
	}
};
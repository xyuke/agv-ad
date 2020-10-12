module.exports = {
	devServer: {
		proxy: {
			'/prefix': {
				target: 'http://192.168.1.39:8070',
				pathRewrite: {
					'^/prefix':''
				}
			}
		},
	}
}


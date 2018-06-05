module.exports = {
	include: /\.min\.js$/,
	sourceMap: true,
	uglifyOptions: {
		output: {
			beautify: false
		},
		keep_fnames: true
	}
};

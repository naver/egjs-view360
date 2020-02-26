module.exports = function(api) {
	api.cache(true);
	const presets = [
		[
			"@babel/preset-env",
			{
				"loose": true,
				"modules": false
			}
		]
	];
	const plugins = [
		"no-side-effect-class-properties",
		["@babel/plugin-proposal-class-properties", {"loose": true}],
		"transform-es3-property-literals",
		"transform-es3-member-expression-literals",
		"transform-object-assign",
		"es6-promise-esm"
	];

	return {
		presets,
		plugins
	};
};

function merge(config1, config2, options = {"plugins": "append", "output": "append"}) {
	const config = Object.assign({}, config1);

	for (const key in config2) {
		const type = options[key];

		if (type === "append") {
			const value1 = config1[key];
			const value2 = config2[key];

			if (!value1 || typeof value2 !== "object") {
				config[key] = config2[key];
			} else if (Array.isArray(value2)) {
				config[key] = [].concat(value1, value2);
			} else {
				config[key] = Object.assign({}, value1, value2);
			}
		} else {
			config[key] = config2[key];
		}
	}
	return config;
}

exports.mergeList = function mergeList(defaultConfig, configs) {
	return configs.map(config => merge(defaultConfig, config));
};

exports.merge = merge;

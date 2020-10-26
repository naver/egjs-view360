export function merge(target, ...srcs) {
	srcs.forEach(source => {
	  Object.keys(source).forEach(key => {
		const value = source[key];
		if (Array.isArray(target[key]) && Array.isArray(value)) {
			target[key] = [...target[key], ...value];
		} else {
			target[key] = value;
		}
	  });
	});

	return target;
}

module.exports = function install(Type) {
	Type.define('number', function Normalizer() {
		return function normalize(options) {
			return {
				type: 'number'
			};
		};
	});

	Type.define('string', function Normalizer() {
		return function normalize(options) {
			const finalOptions = {
				type: 'string',
				pattern: null
			};

			const { pattern } = options;

			if (pattern) {
				finalOptions.pattern = new RegExp(pattern);
			}

			return finalOptions;
		};
	});

	Type.define('boolean', function Normalizer() {
		return function normalize() {
			return { type: 'boolean' };
		};
	});
};
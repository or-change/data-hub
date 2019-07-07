module.exports = function install(Type) {
	Type.define('object', function Normalizer(compiler) {
		return function normalize(options) {
			const finalOptions = {
				type: 'object',
				properties: {},
				allowNull: [],
				additional: true
			};

			const {
				properties = finalOptions.properties,
				allowNull = finalOptions.allowNull,
				additional = finalOptions.additional
			} = options;

			if (typeof additional !== 'boolean') {
				throw new Error('Type object schemas `options.additional` MUST be a boolean.');
			}

			finalOptions.additional = additional;

			if (!Array.isArray(allowNull)) {
				throw new Error('Type object schemas `options.allowNull` MUST be array.');
			}

			if (typeof properties !== 'object') {
				throw new Error('Type object schemas `options.properties` MUST be object.');
			}

			for (const propertyName in properties) {
				finalOptions.properties[propertyName] =
					compiler.parse(properties[propertyName], false);
			}

			allowNull.forEach(propertyName => {
				if (!properties[propertyName]) {
					throw new Error('This property is NOT defined when set allowNull.');
				}

				finalOptions.allowNull.push(propertyName);
			});

			return finalOptions;
		};
	});

	Type.define('array', function Normalizer(compiler) {
		return function normalize(options) {
			const finalOptions = {
				type: 'array',
				items: null,
				length: {
					min: 0,
					max: Infinity
				}
			};

			const {
				items = finalOptions.items,
				length = finalOptions.length
			} = options;

			if (items) {
				if (typeof items !== 'object') {
					throw new Error('Invalid array items.');
				}

				finalOptions.items = compiler.parse(items, false);
			}

			if (length) {
				if (typeof length !== 'object') {
					throw new Error('');
				}
			}

			return finalOptions;
		};
	});
};
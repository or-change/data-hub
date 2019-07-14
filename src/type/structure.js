module.exports = function install(type) {
	type.define('object', {
		Normalizer(compiler) {
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
		},
		Validator(options) {
			const validatorMapping = {};

			for(const propertyName in options.properties) {
				const options = options.properties[propertyName];

				validatorMapping[propertyName] = type.registry[options.type].Validator(options);
			}

			return function (dataNode) {
				// for (const propertyName in validatorMapping) {
				// 	const 
				// }
			};
		},
		Accessor(options) {
			const accessors = {};

			for (const name in options.properties) {
				const propertyOptions = options.properties[name];

				accessors[name] = type.registry[propertyOptions.type].Accessor(propertyOptions);
			}

			const proxyHandler =  {
				set() {
					throw new Error('Illegal access.');
				},
				get(target, key) {
					const options = options.properties[key];

					if (!options) {
						throw new Error(`Property ${key} is NOT defined.`);
					}

					const data = target[key];

					if (data === null) {
						return null;
					}

					return accessors[key](data);
				}
			};

			return function access(dataNode) {
				return new Proxy(dataNode, proxyHandler);
			};
		}
	});

	type.define('array', {
		Normalizer(compiler) {
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
		},
		Validator(options) {

		},
		Accessor(options) {
			const itemsOptions = options.items;
			const access = type.registry[itemsOptions.type].Accessor(itemsOptions);

			const proxyHandler =  {
				set() {
					throw new Error('Illegal access.');
				},
				get(target, key) {
					const options = options.properties[key];

					if (!options) {
						throw new Error(`Property ${key} is NOT defined.`);
					}

					const data = target[key];

					if (data === null) {
						return null;
					}

					return access(data);
				}
			};

			return function access(dataNode) {
				return new Proxy(dataNode, proxyHandler);
			}
		},
	});
};
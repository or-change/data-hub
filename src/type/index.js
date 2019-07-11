const EventEmitter = require('events');

const Type = module.exports = {
	registry: {},
	Schemas: {
		assert(options) {
			if (typeof options !== 'object') {
				throw new Error('`options` items MUST be an object');
			}
		
			const typeSymbol = options.type;
		
			if (typeof typeSymbol !== 'string') {
				throw new Error('`options.type` MUST be a string');
			}
		
			if (!Type.registry[typeSymbol]) {
				throw new Error('Type named `options.type` is NOT defined.');
			}
		},
		Compiler: class TypeSchemasCompiler extends EventEmitter {
			constructor() {
				super();

				this.normalizer = {};

				for (const symbol in Type.registry) {
					const _normalizer = Type.registry[symbol].Normalize(this);

					this.normalizer[symbol] = function normalize(options, root) {
						Type.Schemas.assert(options);

						return _normalizer(options, root);
					};
				}
			}

			parse(schemas, root = true) {
				return this.normalizer[schemas.type](schemas, root);
			}

			build(schemas, models) {
				return Type.registry.Validator(this.parse(schemas), models);
			}
		},
	},
	define(typeSymbol, options) {
		Type.registry[typeSymbol] = options;
	}
};

[
	'./structure', './simple',
	'./model', './date'
].forEach(path => require(path)(Type));
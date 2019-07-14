const EventEmitter = require('events');

const struct = require('./struct');
const simple = require('./simple');
const native = require('./native');
const model = require('./model');

module.exports = function Type(context) {
	const type = {
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
			
				if (!type.registry[typeSymbol]) {
					throw new Error('type named `options.type` is NOT defined.');
				}
			},
			Compiler: class TypeSchemasCompiler extends EventEmitter {
				constructor() {
					super();

					this.normalizer = {};

					for (const symbol in type.registry) {
						const _normalize = type.registry[symbol].Normalizer(this);

						this.normalizer[symbol] = function normalize(options, root) {
							type.Schemas.assert(options);

							return _normalize(options, root);
						};
					}
				}

				parse(schemas, root = true) {
					return this.normalizer[schemas.type](schemas, root);
				}

				build(schemas, models) {
					return type.registry[schemas.type].Validator(this.parse(schemas), models);
				}
			},
		},
		define(typeSymbol, options) {
			type.registry[typeSymbol] = options;
		}
	};

	[struct, simple, native, model].forEach(install => install(type, context));

	return type;
};

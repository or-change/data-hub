const EventEmitter = require('events');

const registry = {};
const Type = module.exports = {
	Schemas: {
		assert(options) {
			if (typeof options !== 'object') {
				throw new Error('`options` items MUST be an object');
			}
		
			const typeSymbol = options.type;
		
			if (typeof typeSymbol !== 'string') {
				throw new Error('`options.type` MUST be a string');
			}
		
			if (!registry[typeSymbol]) {
				throw new Error('Type named `options.type` is NOT defined.');
			}
		},
		Compiler: class TypeSchemasCompiler extends EventEmitter {
			constructor(options) {
				super();

				const {
					includes = Object.keys(registry)
				} = options;

				this.normalizer = {};

				for (const symbol in registry) {
					const _normalizer = registry[symbol](this);

					this.normalizer[symbol] = function normalize(options, root) {
						Type.Schemas.assert(options);

						return _normalizer(options, root);
					};
				}
			}

			parse(options, root = true) {
				return this.normalizer[options.type](options, root);
			}

			createValidator(options) {
				const schemas = this.parse(options);

				return function validate(data) {

				};
			}
		},
	},
	define(typeSymbol, Normalizer) {
		registry[typeSymbol] = Normalizer;
	},
	use(install) {
		install(Type);
	},
};
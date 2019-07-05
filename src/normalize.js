const assert = require('./assert');

const MODEL_METHOD_LIST = ['create', 'delete', 'update', 'query'];
const NO_IMPLEMENTATION = MODEL_METHOD_LIST.reduce((context, name) => {
	context[name] = function throwNotImplement() {
		throw new Error(`Method Model.${name}() is NOT defined.`);
	};

	return context;
}, {});

exports.normalize = function normalizeOptions(options) {
	const finalOptions = {
		strict = true,
		models = {},
		namespaces = {},
		subscribes = {}
	};

	const {
		id,
		strict = finalOptions.strict,
		models = finalOptions.models,
		namespaces = finalOptions.namespaces,
		subscribes = finalOptions.subscribes
	} = options;

	/**
	 * id
	 */
	if (!assert.registryId(id)) {
		throw new Error('Invalid registry id.');
	}

	finalOptions.id = options.id;

	const modelNameDefinedList = [];
	/**
	 * Models
	 */
	if (typeof models !== 'object') {
		throw new Error('Property `options.models` MUST be an object.');
	}

	for (const name in models) {
		const finalModelOptions = {
			schemas: {},
			methods: {},
			comments: null
		};

		const { schemas, methods } = models[name];

		if (schemas) {

		}

		if (methods) {
			MODEL_METHOD_LIST.forEach(name => {
				const options = methods[name];
				const type = typeof options;
				const finalMethodOptions = {
					handler: NO_IMPLEMENTATION[name],
					mock: NO_IMPLEMENTATION[name],
					// comments: null
				};
				
				if (type === 'function') {
					finalMethodOptions.handler = options;
				} else if (type === 'object') {
					const { handler, mock, emit } = options;

					if (handler) {
						if (typeof handler !== 'function') {
							throw new Error('Method handler MUST be a function.');
						}

						finalMethodOptions.handler = handler;
					}

					if (mock) {
						if (typeof mock === 'function') {
							throw new Error('Method mock MUST be a function.');
						}

						finalMethodOptions.mock = mock;
					}

					if (emit) {
						if (typeof emit === 'function') {
							throw new Error('Method emit MUST be a function.');
						}
						
						finalMethodOptions.emit = emit;
					}

					//TODO define method comments for its options.
				} else if (type !== 'undefined') {
					throw new Error('Invalid method options.');
				}

				finalModelOptions.methods[name] = finalMethodOptions; 
			});
		}

		finalOptions.models[name] = finalModelOptions;
	}

	/**
	 * namespaces
	 */
	for (const symbol in namespaces) {
		const {
			protocol,
			token,
			id,
			modelList = []
		} = namespaces[symbol];
	}

	/**
	 * subscribes
	 */

	

	return finalOptions;
};
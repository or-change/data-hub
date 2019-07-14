const EventEmitter = require('events');
const Type = require('./type');
const Model = require('./model');
const normalize = require('./normalize');

const MODELS_PROXY = {
	get(models, symbol) {
		const model = models[symbol];

		if (!model) {
			throw new Error('The model is NOT defined.');
		}

		return model.proxy;
	},
	set() {
		throw new Error('Illegal access.');
	}
};

module.exports = function Hub(options) {
	const {
		id,
		models: modelsOptions,
		namespaces: namespacesOptions,
		subscribes: subscribeOptions,
		protocol = [],
		plugins = [],
		strict = true
	} = normalize(options);

	const context = {
		models: {},
		namespaces: {},
		required: {},
		defined: {},
		strict
	};
	
	const type = context.type = new Type(context);
	const compiler = context.compiler = new type.Schemas.Compiler(context.models);

	compiler.on('model-require', symbol => context.required[symbol] = true);

	for (const symbol in modelsOptions) {
		const options = modelsOptions[symbol];

		if (symbol !== options.symbol) {
			throw new Error('It should be `symbol === options.symbol`.');
		}

		context.models[symbol] = new Model(symbol, modelsOptions[symbol], context);
		context.defined[symbol] = true;
	}

	for (const parentSymbol in namespacesOptions) {
		const options = namespacesOptions[parentSymbol];

		options.models.forEach(symbol => {
			const fullSymbol = `${parentSymbol}.${symbol}`;

			context.models[fullSymbol] = new Model.Namespace(fullSymbol);
			context.defined[fullSymbol] = true;
		});

		context.namespaces[parentSymbol] = options;
	}

	Object.keys(context.required).forEach(requiredSymbol => {
		if (!context.defined[requiredSymbol]) {
			throw new Error(`The required Model(${requiredSymbol}) is NOT defined.`);
		}
	});
	
	const hub = Object.create(new EventEmitter(), {
		model: {
			value: new Proxy(context.models, MODELS_PROXY)
		},
		overview: {
			get() {
				return {
					id
				};
			}
		}
	});

	(async function bootstrap() {
		//TODO link remote db

		//TODO model type check and compile

		//TODO build static schemas

		//TODO check subscribe

		hub.emit('ready', hub);
	}());

	return hub;
};
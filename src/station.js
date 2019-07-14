const EventEmitter = require('events');
const Type = require('./type');
const Model = require('./model');

module.exports = function Station(options) {
	const {
		id,
		models: modelsOptions,
		namespaces: namespacesOptions,
		subscribes: subscribeOptions,
		protocol = [],
		plugins = [],
		strict = false
	} = normalize(options);

	const context = {
		models: {},
		namespaces: {},
		required: {},
		defined: {}
	};
	
	const compiler = Type.Schemas.Compiler(context.models);

	compiler.on('model-require', symbol => context.required[symbol] = true);

	context.type = new Type(context);

	for (const symbol in modelsOptions) {
		const options = modelsOptions[symbol];

		if (symbol !== options.symbol) {
			throw new Error('It should be `symbol === options.symbol`.');
		}

		context.models[symbol] = new Model(symbol, modelsOptions[symbol], compiler);
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
		
	(async function bootstrap() {
		//TODO link remote db

		//TODO model type check and compile

		//TODO build static schemas

		//TODO check subscribe

		registry.emit('ready', registry);
	}());


	return Object.create(new EventEmitter(), {
		model(symbol) {
			const model = context.models[symbol];

			if (!model) {
				throw new Error('The model is NOT defined.');
			}

			return model.proxy;
		},
		get overview() {
			return {};
		}
	});

};

function normalize() {

};
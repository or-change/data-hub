module.exports = function install(type, context) {
	const symbolReg = type.ModelSymbolReg = /^[A-Z][A-Za-z0-9]*/;

	type.define('model', {
		Normalizer(compiler) {
			return function normalize(options, root) {
				if (root) {
					throw new Error('Schemas root must NOT be a model.');
				}
	
				const finalOptions = {
					type: 'model',
				};
	
				const { symbol } = options;
	
				if (typeof symbol !== 'string') {
					throw new Error('Model symbol must be a string.');
				}
				
				if (!symbolReg.test(symbol)) {
					throw new Error('Invalid Model symbol.');
				}
	
				compiler.emit('model-require', finalOptions.symbol = symbol);
	
				return finalOptions;
			};
		},
		Validator(options) {
			return function validate(data) {
				return context.models[options.model].validate(data);
			};
		},
		Accessor(options) {
			return function access(dataNode) {
				const Model = context.models[options.model];

				return new Model.Instance(dataNode).proxy;
			};
		}
	});
};
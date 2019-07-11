module.exports = function install(Type) {
	const symbolReg = Type.ModelSymbolReg = /^[A-Z][A-Za-z0-9]*/;

	Type.define('model', {
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
		Validator(options, models) {
			return function validate(data) {
				return models.[options.model].validator(data);
			};
		},
		Accessor(options, models) {
			return function accessor(dataNode) {
				const { ModelInstance } =  models[options.model];

				return new ModelInstance(dataNode).proxy;
			};
		}
	});
};
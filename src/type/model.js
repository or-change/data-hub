module.exports = function install(Type) {
	const symbolReg = Type.ModelSymbolReg = /^[A-Z][A-Za-z0-9]*/;

	Type.define('model', function Normalizer(compiler) {
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
	});

	//TODO type `as`?
};
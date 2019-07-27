module.exports = function install(Type) {
	Type.define('date', {
		Normalizer() {
			return function normalize(options) {
				const finalOptions = {
					type: 'date'
				};
				
				return finalOptions;
			};
		},
		Validator(options) {
			return function validator(data) {
				if (!(data instanceof Date)) {
					throw new Error('A date object expected.');
				}
			};
		},
		Accessor() {
			return function access(dataNode) {
				return dataNode;
			};
		}
	});

	const Blob = Type.Blob = class DataHubBlob {
		constructor(type, buffer) {
			this.mimeType = type;
			this.buffer = Buffer.from(buffer);
		}

		get base64() {
			return this.buffer.toString('base64');
		}
	};

	const blobProxyOptions = {
		set() {
			throw new Error('illegal access.');
		}
	};

	Type.define('blob', {
		Normalizer() {
			return function normalize(options) {
				const finalOptions = {
					type: 'blob'
				};
				
				return finalOptions;
			};
		},
		Validator() {
			return function validator(data) {
				if (!(data instanceof Blob)) {
					throw new Error('A blob expected.');
				}
			};
		},
		Accessor() {
			return function access(dataNode) {
				return new Proxy(dataNode, blobProxyOptions);
			};
		}
	});
};
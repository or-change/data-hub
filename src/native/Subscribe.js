module.exports = {
	schema: {
		type: 'object',
		properties: {
			symbol: {
				type: 'string'
			},
			method: {
				type: 'string'
			},
			at: {
				type: 'string'
			},
			time: {
				type: 'date'
			}
		}
	},
	methods: {
		query(options) {
			const { symbol, method } = options;

		},
		update(options) {
			const { at, symbol, method } = options;
		}
	}
};
module.exports = {
	schemas: {
		type: 'object',
		properties: {
			symbol: {
				type: 'string'
			},
			method: {
				type: 'string'
			},
			hash: {
				type: 'string'
			},
			args: {
				type: 'string'
			},
			createAt: {
				type: 'date'
			}
		}
	},
	methods: {
		async create(options) {
			const { symbol, method, args } = options;

			
		}
	}
};
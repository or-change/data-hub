module.exports = {
	schemas: {
		type: 'object',
		properties: {
			list: {
				type: 'array',
				items: {
					type: 'model',
					name: 'Subscribe'
				}
			}
		}
	},
	methods: {
		query(options) {

		}
	}
};
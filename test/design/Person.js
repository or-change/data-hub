module.exports = {
	symbol: 'Person',
	schemas: {
		type: 'object',
		properties: {
			id: {
				type: 'number',
				range: [
					{ gt: { value: 0 }, }
				]
			},
			man: { type: 'boolean' },
			name: { type: 'string' },
			age: {
				type: 'number',
				range: [
					{ lt: { value: 150, equal: false }, gt: { value: 0, equal: true } }
				]
			},
			parentList: { type: 'array', items: { type: 'model', symbol: 'Person' } },
			spouse: { type: 'model', symbol: 'Person' },
			childList: { type: 'array', items: { type: 'model', symbol: 'Person' } }
		},
		allowNull: ['childList', 'spouse']
	},
	methods: {
		create: {
			async handler(options) {
				return {
					id: 1,
					man: true,
					name: 'a',
					age: 18,
					parentList: [],
					spouse: null,
					childList: null
				};
			},
			mock() {

			},
			emit(data) {

			}
		},
		async query(options) {
			return {};
		},
		delete(options) {
			
		},
	}
};
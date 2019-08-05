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
			name: { type: 'string', pattern: /.{2,12}/ },
			age: {
				type: 'number',
				range: [
					{ lt: { value: 150, equal: false }, gt: { value: 0, equal: true } }
				]
			},
			parentList: { type: 'array', items: { type: 'model', symbol: 'Person' } },
			spouse: { type: 'model', symbol: 'Person' },
			childList: { type: 'array', items: { type: 'model', symbol: 'Person' } },
			test: {
				type: 'object',
				properties: {
					boss: {
						type: 'model',
						symbol: 'Person'
					}
				}
			}
		},
		allowNull: ['spouse', 'test']
	},
	methods: {
		create: {
			async handler(options, Model) {
				return {
					id: 1,
					man: true,
					name: 'abc',
					age: 18,
					parentList: [
						{
							id: 2,
							man: true,
							name: '2b',
							age: 18,
							parentList: [],
							spouse: null,
							childList: [],
							test: null
						}
					],
					spouse: null,
					childList: [],
					test: {
						boss: {
							id: 3,
							man: true,
							name: '4b',
							age: 18,
							parentList: [],
							spouse: null,
							childList: [],
							test: null}
					}
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
			console.log(this)
		},
	}
};
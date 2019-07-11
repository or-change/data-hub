module.exports = {
	schemas: {
		type: 'object',
		properties: {
			type: {
				type: 'string',
				pattern: /abc/
			},
			id: {
				type: 'number',
				min: 0,
				max: 100
			},
			man: {
				type: 'boolean',
			},
			name: {
				type: 'string',
			},
			age: { type: 'number', min: 0, max: 200 },
			parentList: {
				type: 'array',
				items: { type: 'model', name: 'Person' }
			},
			spouse: {
				type: 'model',
				name: 'Fruit.Apple'
			},
			childList: {
				type: 'array',
				items: {
					type: 'model',
					name: 'Person'
				}
			}
		},
		allowNull: []
	},
	methods: {
		create: {
			async handler(options) {

			},
			mock() {

			},
			emit(data) {

			}
		},
		async query(options) {
			data.base.name = 'test2';
			data.base.age = 12;
			
			data.extend.parent.append(options);
				
			data.extend.spouse(() => {

			});
		},
		update: undefined,
		delete(options) {
			
		},
	}
};
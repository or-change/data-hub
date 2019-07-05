module.exports = {
	schemas: {
		type: 'array',
		items: {
			type: 'model',
			name: 'EventLog'
		}
	},
	methods: {
		query(options) {
			const { id, start } = options;

		}
	}
}
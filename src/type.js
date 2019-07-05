const types = module.exports = {
	object: {
		normalizeSchemas(options) {
			const {
				properties = {},
				allowNull = [],
			} = options;

			if (!Array.isArray(allowNull)) {
				throw new Error('Type object schemas `options.allowNull` MUST be array.');
			}

			if (!Object.)

			return {

			};
		},
		Validate(options) {
			return function validate(data) {

			}
		}
	},
	array: {
		normalizeSchemas(options) {

		},
		Validate() {

		}
	},
	blob: {
		normalizeSchemas(options) {

		},
		Validate() {

		}
	},
	model: {
		normalizeSchemas(options) {

		},
		Validate() {

		}
	},
	like: {

	},
	string: {
		normalizeSchemas(options) {

		},
		Validate() {

		}
	},
	number: {
		normalizeSchemas(options) {

		},
		Validate() {

		}
	},
	boolean: {
		normalizeSchemas(options) {

		},
		Validate() {

		}
	},
	date: {
		normalizeSchemas(options) {

		},
		Validate() {

		}
	}
};
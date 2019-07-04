const assert = require('./assert');

const TYPE_DEFINES = {
	Object: {
		type: 'object'
	},
	Array: {
		type: 
	},
	Blob: {

	},
	Model: {

	},
	String: {

	},
	Number: {

	},
	Boolean: {

	}
};

const NO_IMPLEMENTATION = [
	'create', 'update', 'delete', 'query'
].reduce((context, name) => {
	context[name.toLocaleUpperCase()] = function () {
		throw new Error(`Method Model.${name}() is NOT defined.`);
	};

	return context;
}, {});

exports.normalize = function normalizeOptions(options) {
	const {
		id,
		strict = true,
		models = {},
		namespace = {},
	} = options;

	if (!assert.registryId(id)) {
		throw new Error('Invalid registry id.');
	}

	const finalOptions = { id, strict };

};
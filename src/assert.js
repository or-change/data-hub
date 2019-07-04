const MODEL_NAME = /^[A-Z][a-z0-9]*/;

exports.modelName = function validateModelName(name) {
	if (!MODEL_NAME.test(name)) {
		throw new Error('Invalid model name.');
	}

	return true;
};

const MODEL_PROPERTY_NAME = /^[a-z0-9A-Z_]/;

exports.modelPropertyName = function validateModelPropertyName(name) {
	if (!MODEL_PROPERTY_NAME.test(name)) {
		throw new Error('Invalid model property name.');
	}

	return true;
};

const REGISTRY_ID = /^[a-z0-9.]/;

exports.registryId = function validateModelPropertyName(name) {
	if (typeof name !== 'string' || !REGISTRY_ID.test(name)) {
		throw new Error('Invalid registry id.');
	}

	return true;
};
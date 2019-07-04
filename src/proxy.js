const MODEL_DATA_PROPERTY = {
	name: true, data: true,
	base: true, extend: true,
	update: true, delete: true
};

exports.ModelData = {
	GET(target, key, receiver) {
		if (MODEL_DATA_PROPERTY[key]) {
			return Reflect.get(target, key, receiver);
		}
	
		throw new Error('Model data property can NOT be get.');
	},
	SET() {
		throw new Error('Model data property can NOT be set.');
	}
};

const MODEL_PROPERTY = {
	create: true, query: true
};

exports.Model = {
	GET(target, key, receiver) {
		if (MODEL_PROPERTY[key]) {
			return Reflect.get(target, key, receiver);
		}
	
		throw new Error('Model data property can NOT be get.');
	},
	SET() {
		throw new Error('Model data property can NOT be set.');
	},
};
const DataHub = require('./src/hub');
const Type = require('./src/type');

DataHub.Blob = Type.Blob;
DataHub.create = function createDataHub(options) {
	return new DataHub(options);
};

module.exports = new Proxy(DataHub, {
	construct() {
		throw new Error('Illegal access.');
	}
});

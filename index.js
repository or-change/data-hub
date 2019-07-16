const DataHub = require('./src/hub');

DataHub.create = function createDataHub(options) {
	return new DataHub(options);
};

module.exports = new Proxy(DataHub, {
	construct() {
		throw new Error('Illegal access.');
	}
});
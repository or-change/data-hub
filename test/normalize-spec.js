const assert = require('assert');
const normalize = require('../src/normalize');

describe('normalize::', function () {

	it('should throw error if `id` is undefined.', function () {
		assert.throws(() => {
			normalize({});
		});
	});

	it('should success', function () {
		assert.deepEqual(normalize({
			id: 'abc'
		}), {
			id: 'abc',
			models: {},
			namespaces: {},
			subscribes: {}
		});
	});

	describe('models::', function () {

		describe('schemas::', function () {

		});

		describe('methods::', function () {

		});
	});

	describe('namespaces::', function () {

	});

	describe('subscribes::', function () {

	});
});
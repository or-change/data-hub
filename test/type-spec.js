const assert = require('assert');

const Type = require('../src/type');

describe('Type::', function () {
	describe('Schemas::', function () {
		describe('Compliler::', function () {
			describe.only('#parse()', function () {
				it('compile a typical schema successfully.', function () {
					const schema = {
						type: 'object',
						properties: {
							name: { type: 'string' },
							age: { type: 'number' },
							parent: {
								type: 'array',
								items: { type: 'model', symbol: 'Person' }
							},
							married: { type: 'boolean' },
							birthdate: { type: 'date' },
							dog: { type: 'model', symbol: 'Dog' }
						},
						additional: false,
						allowNull: ['dog']
					};

					const compiler = new Type.Schemas.Compiler();
					const modelRequired = {};
	
					compiler.on('model-require', modelSymbol => {
						modelRequired[modelSymbol] = true;
					});
	
					assert.deepEqual(compiler.parse(schema), {
						type: 'object',
						properties: {
							name: { type: 'string' },
							age: { type: 'number' },
							married: { type: 'boolean' },
							parent: {
								type: 'array',
								items: { type: 'model', symbol: 'Person' }
							},
							birthdate: { type: 'date' },
							dog: { type: 'model', symbol: 'Dog' }
						},
						allowNull: ['dog'],
						additional: false
					});

					assert.deepEqual(modelRequired, { Person: true, Dog: true });
				});

				it('should throw with invalid options.', function () {
					const compiler = new Type.Schemas.Compiler();
	
					assert.throws(() => compiler.parse());
					assert.throws(() => compiler.parse(1));
					assert.throws(() => compiler.parse(true));
					assert.throws(() => compiler.parse({}));
					assert.throws(() => compiler.parse({ type: 'undefined' }));
				});

				describe('<object>', function () {

				});

				describe('<array>', function () {

				});
				
				describe('<model>', function () {

				});
				
				describe('<number>', function () {

				});
				
				describe('<string>', function () {

				});
			});

			describe('assert()', function () {

			});
		});
	});

	describe('define()', function () {
		
	});

	describe('use()', function () {

	});
});
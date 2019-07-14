const Hub = require('../src/hub');

const Person = require('./design/Person');

describe.only('debug::', function () {

	it('come on', async function () {
		const hub = new Hub({
			id: 'org.orchange.hub',
			models: {
				Person: Person
			}
		});

		const ModelPerson = hub.model.Person;
		const person = await ModelPerson.create();
		// const person2 = await ModelPerson.query();
		// const person3 = await ModelPerson.create();
		// person.delete();
		console.log(hub, person);
		// console.log(JSON.stringify(person));
	});
});
const DataHub = require('../');

const Person = require('./design/Person');

describe.only('debug::', function () {

	it('come on', async function () {
		const hub = DataHub.create({
			id: 'org.orchange.hub',
			models: {
				Person: Person
			}
		});

		console.log(hub instanceof DataHub);

		const ModelPerson = hub.model.Person;
		const person = await ModelPerson.create();
		// const person2 = await ModelPerson.query();
		// const person3 = await ModelPerson.create();
		// person.delete();
		console.log(hub, person);
		// console.log(JSON.stringify(person));
		person.parentList[0];
		console.log(JSON.stringify(person));
		console.log(person.test);
		console.log(person.test.boss);
		console.log(person.test.boss.name);
		console.log(JSON.stringify(person.parentList[0]));

		person.$delete();
	});
});
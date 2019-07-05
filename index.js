const normalize = require('./src/options/validator');
const EventEmitter = require('events');
const Validator = require('./src/validate');

function NO_MODEL_INSTANCE_METHOD() {
	throw new Error('Invalid method.');
}

function NO_MODEL_INSTANCE_SET() {
	throw new Error('Model instance property can NOT be set.');
}

function NO_MODEL_SET() {
	throw new Error('Model property can NOT be set.');
}

function deepClone(object) {
	return JSON.parse(JSON.stringify(object));
}

const Registry = module.exports = function Registry(options) {
	const {
		id,
		models: modelsOptionsMap,
		namespaces: namespaceOptionsMap,
		subscribes: subscribeOptionsMap,
		strict = false
	} = normalize(options);

	const models = {};
	const modelProxy = new Proxy(models, {

	});
	const registry = Object.assign(new EventEmitter(), {
		Model: modelProxy,
		getSchemas() {
			return {
				models: {},
				namespace: {

				}
			}
		}
	});
	
	modelsOptionsMap.forEach(function Model({ name, schemas, methods }) {
		const instanceProxyOptions = {
			set: NO_MODEL_INSTANCE_SET,
			get(target, key, receiver) {
				//TODO meta access

				//TODO proxy chain

			}
		};

		const validator = Validator();

		class ModelInstance {
			constructor(data = {}) {
				this.data = data;
				
				this.proxy = new Proxy(this, instanceProxyOptions);
			}

			get $data() {
				return deepClone(this.data);
			}
			
			get $type() {
				return name;
			}
		}

		['update', 'delete'].forEach(methodName => {
			const { handler } = methods[methodName];

			ModelInstance.prototype[`$${methodName}`] = handler ? async function (options) {
				try {
					const data = await handler(options, modelProxy);

					//TODO 完整性检查
	
					return this;
				} catch (error) {

				}
			} : NO_MODEL_INSTANCE_METHOD;
		});

		const static = {
			instanceOf(instanceProxy) {

			}
		};

		['create', 'query'].forEach(methodName => {
			const handler = methods[methodName];

			static[methodName] = async function (options) {
				try {
					const data = await handler(options, modelProxy);
					//TODO 完整性检查

					const instance = new ModelInstance(data);
					
					return instance.proxy;
				} catch (error) {
					
				}
			};
		});

		models[name] = new Proxy(static, {
			get(target, key, receiver) {
				if (!['create', 'query', 'instanceOf'].includes(key)) {
					throw new Error('Illegal access.');
				}

				return Reflect.get(target, key, receiver);
			},
			set: NO_MODEL_SET
		});
	});

	namespaceOptionsMap.forEach(function NamespaceModel(options) {
		// models[] = {};
	});

	(async function ready() {
		//TODO link remote db

		//TODO model type check and compile

		//TODO build static schemas

		//TODO check subscribe

		registry.emit('ready', registry);
	}());

	return registry;
};

Registry.merge = function merge(...options) {

};

Registry.publish = {
	http(registry, options) {
		const schemas = registry.getSchemas();
	},
	registry(registry, options) {
		const schemas = registry.getSchemas();


	}
};
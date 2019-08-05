function deepClone(object) {
	return JSON.parse(JSON.stringify(object));
}

const KEYWORDS = { $as: true, $data: true, $type: true, $update: true, $delete: true };

const Model = module.exports = class Model {
	constructor(symbol, options, context) {
		const { schemas, methods } = options;
		const validate = context.compiler.build(schemas);

		const access = context.type.registry[schemas.type].Accessor(schemas);
		const proxyModelInstance = {
			set() {
				throw new Error('Illegal access.');
			},
			get(target, key) {
				if (KEYWORDS[key]) {
					return Reflect.get(target, key, target);
				}

				return target.dataProxy[key];
			}
		};
		
		class ModelInstance {
			constructor(data) {
				this.data = data;
				this.dataProxy = access(data);
				this.proxy = new Proxy(this, proxyModelInstance);
			}
	
			get $data() {
				return deepClone(this.data);
			}
			
			get $type() {
				return symbol;
			}
	
			$as(symbol) {
				return new context.models[symbol](this.data);
			}
		}
	
		async function methodInvoker(handler, payload, options, ctx) {
			//TODO normalize
			const mergedOptions = Object.assign({}, {
				strict: context.strict
			}, options);

			const data = await handler.call(ctx, payload, context.models);
	
			if (mergedOptions.strict) {
				validate(data);
			}
	
			return data;
		}

		['update', 'delete'].forEach(methodName => {
			const { handler } = methods[methodName];

			ModelInstance.prototype['$' + methodName] = handler && async function (payload, options) {
				this.data = await methodInvoker(handler, payload, options, this);

				return this;
			};
		});
		
		['create', 'query'].forEach(methodName => {
			const { handler, mock } = methods[methodName];

			this[methodName] = handler && async function (payload = null, options = {}) {
				const data = await methodInvoker(handler, payload, options, null);
				const instance = new ModelInstance(data);
				
				return instance.proxy;
			};
		});

		this.validate = validate;
		this.Instance = ModelInstance;
		this.proxy = new Proxy(this, {
			get(target, key, receiver) {
				if (!['create', 'query'].includes(key)) {
					throw new Error('Illegal access.');
				}

				return Reflect.get(target, key, receiver);
			},
			set() {
				throw new Error('Illegal access.');
			}
		});
	}
};

Model.Namespace = class NamespaceModel {

};
module.exports = function install(Type) {
	Type.define('date', function Normalizer() {
		return function normalize(options) {
			return {
				type: 'date'
			};
		};
	});
};
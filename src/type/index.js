const Type = module.exports = require('./type');

Type.use(require('./structure'));
Type.use(require('./simple'));
Type.use(require('./model'));
Type.use(require('./date'));
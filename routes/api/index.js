const router = require('koa-router')();
const user = require('./user');
const forestry = require('./forestry');

router.use('/users', user.routes(), user.allowedMethods()); 
router.use('/forestry', forestry.routes(), forestry.allowedMethods());

module.exports = router;
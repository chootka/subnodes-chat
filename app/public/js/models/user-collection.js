var Collection = require('ampersand-rest-collection')
	,User = require('./user');
	

module.exports = Collection.extend({
    model: User,
    url: '/api/users'
});
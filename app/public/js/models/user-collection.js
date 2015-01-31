var Collection = require('ampersand-collection')
	,underscoreMixin = require("ampersand-collection-underscore-mixin")
	,User = require('./user');
	

module.exports = Collection.extend(underscoreMixin, {
    model: User
});
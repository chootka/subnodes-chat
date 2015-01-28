var Collection = require('ampersand-rest-collection')
	,Message = require('./message');
	

module.exports = Collection.extend({
    model: Message,
    url: '/api/messages'
});
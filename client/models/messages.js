var Collection = require('ampersand-rest-collection');
var Message = require('./message');


module.exports = Collection.extend({
    model: Message,
    url: '/api/message'
});

var Collection = require('ampersand-rest-collection');
var User = require('./user');

module.exports = Collection.extend({
    model: User,
    url: '/api/user'
});

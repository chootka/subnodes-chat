var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
    	id: 'any',
        socket: 'object',
        username: 'any'
    }
});
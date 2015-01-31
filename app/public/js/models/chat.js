var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        error: 'string',
        // store the username of the local user
        username: 'any'
    }
});
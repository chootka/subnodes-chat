var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        error: 'string',
        username: 'any'
    }
});
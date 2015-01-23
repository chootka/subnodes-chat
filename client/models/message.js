var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        username: ['string', true, ''],
        message: ['string', true, '']
    },
    session: {
        selected: ['boolean', true, false]
    },
    derived: {
        avatar: {
            deps: ['firstName', 'lastName'],
            fn: function () {
                return 'http://robohash.org/' + encodeURIComponent(this.username) + '?size=80x80';
            }
        }
    }
});

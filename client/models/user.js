var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        username: ['string', true, '']
    },
    session: {
        selected: ['boolean', true, false]
    },
    derived: {
        avatar: {
            deps: ['username'],
            fn: function () {
                return 'http://robohash.org/' + encodeURIComponent(this.username) + '?size=80x80';
            }
        }
    }
});
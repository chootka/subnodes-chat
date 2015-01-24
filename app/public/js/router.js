
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var ChatPage = require('./pages/chat');


module.exports = Router.extend({
    routes: {
        '': 'main',
        'chat': 'chat',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    main: function () {
        this.trigger('page', new HomePage({
            model: main
        }));
    },

    chat: function() {
        this.trigger('page', new ChatPage({
            model: chat,
            collection: app.messages
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});

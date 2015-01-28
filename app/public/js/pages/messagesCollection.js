var PageView = require('./base')
    ,templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'Hot Probs – Login',
    template: templates.pages.login,
    events: {
        'click [data-hook=loginButton]': 'onLogin'
    },

    // methods

    initialize: function () {
        console.log("init login PageView");

        // if there is an error, handle it
        this.listenTo(this.model, 'change:error', this.handleError, this);
    },
    render: function () {

        console.log("render login PageView");

        this.renderWithTemplate();

        return this; // why are we returning this ?
    },
    handleError: function(err) {
        console.log("error captured on login");
    },
    onLogin: function(e) {

        // capture the username and login with it
        app.socketClient.login( this.$('#username').text() );
    }
});

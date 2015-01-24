
// This app view is responsible for rendering the chat window.

var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.chat,
    events: {
        'keypress #sendMessage': 'sendMessagePressed'
    },


    // methods

    initialize: function () {

        //var users = this.model.get('users');
        var messages = this.model.get('messages');

        // listen to user activity
        //this.listenTo(users, 'add', this.renderUser, this);
        this.listenTo(users, 'remove', this.renderUsers, this);

        // listen to chat activity
        this.listenTo(messages, 'add', this.renderMessage, this);
    },
    render: function () {

        var users = this.model.get('users');

        //this.renderUsers();
        this.renderMessages();

        // main renderer
        this.renderWithTemplate({chat: chat});

        return this;
    },
    renderUsers: function(model) {
        // maybe i won't use this

        // this would use the Users Collection model
    },
    renderUser: function(model) {
        // this would use the User model

        //this.autoscroll();
    },
    renderMessages: function(model) {

        this.$('#msgInput').empty();

        // this would use the Messages Collection model
        this.model.get('messages').each(function(message) {
            this.renderMessage(message);
        }, this);

        this.autoscroll();
    },
    renderMessage: function(model) {

        //this would use the Message model

    },

    // utils
    autoscroll: function() {
        var chat = $('#conversation');
        chat.scrollTop = chat.scrollHeight;
    }


    // events

    sendMessagePressed: function(e) {
        if (e.keyCode == 13) {
            this.vent.trigger('message', this.$('#msgInput').val());
            this.$('#msgInput').val('');

            return false;
        }
    }
});

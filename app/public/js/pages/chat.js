var PageView = require('./base')
	,templates = require('../templates')
    ,MessageView = require('../views/message');


module.exports = PageView.extend({
    pageTitle: 'Hot Probs – Chat',
    template: templates.pages.chat,
    events: {
        'click [data-hook=send]': 'send',
        'keypress [data-hook=send]': 'keypress'
    },

    // methods

    initialize: function () {
    	console.log("init chat!");

        // listen to user activity
    	//this.listenTo(app.users, 'addUser', this.renderChat, this);
        //this.listenTo(app.users, 'removeUser', this.renderChat, this);

        // listen to chat activity
        //this.listenTo(app.users, 'addMessage', this.renderMessage, this);
    },
    render: function () {
        console.log("render!");

        this.renderWithTemplate();

        this.renderCollection(app.messages, MessageView, this.queryByHook('incoming'));
        if (!app.users.length) {
            this.fetchCollection();
        }

        this.autoscroll();
        this.clearText();
    },
    fetchCollection: function () {
        this.collection.fetch();
        return false;
    },
    resetMessages: function () {
        app.messages.reset();
    },
    // renderUsers: function(model) {
    // 	console.log("render messages");

    //     app.messages.each(function(user) {
    //          this.renderUser(user);
    //     }, this);

    //     this.autoscroll();
    //     this.clearText();
    // }


    // handlers

    send: function () {
        app.messages.create({ message: this.getText() }, {
            error: function (model, err) {
                model.destroy();
                alert('Error: ' + err.message);
            }
        });

        this.clearText();
    },
    keypress: function (e) {
        if (e.which === 13) this.send();
    },


    // utils

    getText: function () {
        return this.$('#msgInput').text();
    },
    clearText: function () {
        this.$('#msgInput').text('');
    },
    autoscroll: function() {
    	console.log("autoscroll");
		var $convo = this.$('#conversation');
        $convo.scrollTop = $convo.scrollHeight;
    }
});

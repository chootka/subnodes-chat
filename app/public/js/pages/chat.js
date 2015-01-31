var PageView = require('./base')
    ,templates = require('../templates')
    ,MessageView = require('../views/message')
    ,Message = require('../models/message');


module.exports = PageView.extend({
    pageTitle: 'Hot Probs – Chat',
    template: templates.pages.messages,
    events: {
        // 'click [data-hook=send]': 'send',
        'keypress [data-hook=send]': 'keypress'
    },

    // methods

    render: function () {

        if ( this.model.username ) {
            // console.log("render messages collection");

            this.renderWithTemplate();
            this.renderCollection(this.collection, MessageView, this.queryByHook('incoming'));
            // if (!this.collection.length) {
            //     this.fetchCollection();
            // }    

            this.autoscroll();
            this.clearText();
        } 
        else {
            // console.log("send user back to login");
            // if there is no user, send back to main page
            // ( could be improved )
            app.navigate('main');
        }
    },
    // fetchCollection: function () {
    //     this.collection.fetch();
    //     return false;
    // },
    // resetCollection: function () {
    //     this.collection.reset();
    // },

    // handlers

    send: function () {

        // find your user obj
        var self = this;
        var u = app.users.find( function(user) {
                return user.get('username') == self.model.username;
            });

        // create new message model
        var message = new Message({user: u, message: this.getText()});

        // send the chat to the socket client to be broadcast
        app.socketClient.chat( message );

        // clear the sending text field
        this.clearText();
    },
    userJoined: function(user) {

        // create new message model with user connected message
        this.collection.add( {user: user, message: username + ' connected.'} );
    },
    userLeft: function(username) {

        // create new message model with user left message
        this.collection.add( {user: {username: username}, message: username + ' disconnected.'} );
            // var decoded = decodeURIComponent( username );
            // $incoming.append('<span style="color:#009a16;font-style:italic;"> > '+decoded+' disconnected</span><br>');
            // chatClient.fn.autoscroll();
    },
    onlineUsers: function(data) {

        // get how many people are currently connected
        var i = 0;
        for (var p in data) i++;
        var count = i > 1 ? ' are ' + i + ' people ' : ' is ' + i + ' person ';

        // add a series of new message models welcoming the new user
        this.collection.add( {user: user, message: username + ' connected.'} );
        this.collection.add( {user: user, message: '> *** Welcome to Hot Probs, '+username+'!!! ***'} );
        this.collection.add( {user: user, message: '> ***  There '+count+' currently connected ***'} );

    },
    keypress: function (e) {
        if (e.which === 13) this.send();
    },


    // utils

    getText: function () {
        return this.$('#message').val();
    },
    clearText: function () {
        this.$('#message').val('');
    },
    autoscroll: function() {
        console.log("autoscroll");
        var $convo = this.$('#conversation');
        $convo.scrollTop = $convo.scrollHeight;
    }
});

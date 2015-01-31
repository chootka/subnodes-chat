var _ = require('underscore')
    ,AmpersandState = require('ampersand-state')
    ,Message = require('./models/message');


module.exports = AmpersandState.extend({
    props: {
        hostname: 'http://' + window.location.host,
        io: {},
        socket: {}
    },

    connect: function(io) {

        var self = this;

        this.io = io;
       
        this.socket = this.io.connect(this.hostname);
        this.socket.on('connect', function() {

            self.setResponseListeners(self.socket);
        });
    },

    login: function(username) {

        this.socket.emit('login', username);
    },

    chat: function(message) {

        this.socket.emit('chat', message);
    },
    
    setResponseListeners: function(socket) {

        var self = this;

        socket.on('welcome', function(data) {

            // console.log("Welcome! Getting currently online users...");

            // who is currently online?
            socket.emit('onlineUsers');
        });

        socket.on('loginNameExists', function(data) {

            app.login.error = data;
            console.log("Login Name Exists, notified in socket client");

        });

        socket.on('loginNameBad', function(data) {

            app.login.error = data;
            console.log("Login Name Malformed, notified in socket client");
        });

        socket.on('saveLocalUser', function(user) {
            
            // save local user to main chat model
            app.chat.username = user.username;
        });

        socket.on('userJoined', function(user) {

            // assign the user a color (just for fun!)
            var colors = ['#dfe937', '#ff9b39', '#2fa9f0', '#946af1', '#39f0c3'];
            user.color = colors[ Math.floor(Math.random() * colors.length) ];

            // add the new user to our user-collection
            app.users.add( user );

            // generate new message about this
            app.messages.add( new Message( {user: user, message: ' has joined.'}) );
            
        });

        socket.on('userLeft', function(username) {

            // console.log("userLeft, notified in socket client: " + username);

            var u = app.users.find( function(user) { 
                return user.get('username') == username;
            });
            if (u) {

                // remove user from our user-collection
                app.users.remove( u );

                // generate new message about this
                app.messages.add( new Message( {user: u, message: ' has left.'}) );
            }

        });

        socket.on('onlineUsers', function(users) {

            // console.log('onlineUsers requested, notified in socket client: ' + data);

            // generate new message about this
            // app.messages.add( new Message( {user: null, message: user.length + ' are chatting.'}) );

        });

        socket.on('messageReceived', function(message) {

            // add message to our message-collection
            app.messages.add( message );
        });
    }

});
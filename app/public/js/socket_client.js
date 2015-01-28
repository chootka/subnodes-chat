_ = require('underscore'),
User = require('./models/user');


var SocketClient = function(options) {
	
    var self = this;

    self.hostname = 'http://' + window.location.host;

    self.io = options.io;

    self.socket = {};

    self.connect = function() {

    	self.socket = self.io.connect(self.hostname);

    	self.socket.on('connect', function(d) {

    		console.log("client socket connected");

    		self.setResponseListeners(self.socket);
    	})
    }

    self.login = function(username) {
    	self.socket.emit('login', username);
    }

    self.chat = function(chat) {
    	self.socket.emit('chat', chat);
    }
    
    self.setResponseListeners = function(socket) {

    	socket.on('welcome', function(data) {

            console.log("welcome!");

    		//this.trigger('loginComplete', data);
    	});

    	socket.on('loginNameExists', function(data) {

            app.login.save(data, {
                wait: true,
                success: function () {
                    console.log("Login Name Exists, notified in socket client");
                }
            });
    	});

    	socket.on('loginNameBad', function(data) {

            app.login.save(data, {
                wait: true,
                success: function () {
                    console.log("Login Name Malformed, notified in socket client");
                }
            });
    	});

    	socket.on('onlineUsers', function(data) {

    		console.log('onlineUsers requested, notified in socket client: ' + data);

    		//this.trigger('usersInfo', data);
    	});

    	socket.on('userJoined', function(username) {

            console.log("a new user has joined, notified in socket client: " + username);

            // add our new user to the users collection
            var newUser = new User( {username: username, socket: socket} );
            app.users.add( newUser );

            socket.emit('onlineUsers');
    	});

    	socket.on('userLeft', function(user) {

            console.log("userLeft, notified in socket client: " + user.username);

            app.users.remove( user );
    	});

		socket.on('chat', function(data) {

			console.log('client socket received chat, notified in socket client');

		  	//this.trigger('chatReceived', data);
		});
    }
    
}

module.exports = SocketClient;
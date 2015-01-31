var _ = require('underscore')
    ,AmpersandState = require('ampersand-state');


var SocketServer = function(options) {
	
    var self = this;

    self.io = options.io;

    // keep track of who is online
    // eventually save this to a db for better synching
    self.users = [];

    self.init = function() {
	
		// Fired upon a connection
		self.io.on('connection', function(socket) {
			console.log('chat server has connected to client socket ' + socket);
		    self.handleConnection(socket);
		});
    }


    self.handleConnection = function(socket) {

    	console.log("setting up socket listeners on server...");

		// wait for a login
		socket.on('login', function(username) {

			console.log('server says: user is attempting to login...');

		    var nameBad = !username || username.length < 3 || username.length > 10;

		    if (nameBad) {
				console.log('server says: username is bad!');
				socket.emit('usernameBad', username);
				return;
		    }

		    
		    var nameExists = _.some(self.users, function(item) {

				return item.username == username;
		    });

		    
		    if (nameExists) {
				console.log('server says: username exists!');

				socket.emit('usernameExists', username);
		    } else {
				console.log('server says: success. creating new user!');

				var newUser = { id: socket.id, username: username };
				
				//can i sync the local self.users arr to the users collection on client side?
				// save user locally here
				self.users.push(newUser);

				self.setResponseListeners(newUser, socket);

				// save local user
				socket.emit('saveLocalUser', newUser);
				// let all other clients know a new user joined
				self.io.emit('userJoined', newUser);
		    }
		});
	}

	self.setResponseListeners = function(user, socket) {

		socket.on('disconnect', function() {
			console.log("server socket has disconnected: " + user.username);

		    self.users.splice(self.users.indexOf(user), 1);
		    self.io.emit('userLeft', user.username);
		});

		socket.on('onlineUsers', function() {

			console.log('server socket is getting online users');

		    var users = _.map(self.users, function(u) {

				return u.username;
		    });
		    
		    socket.emit('onlineUsers', users);
		});
		
		socket.on('chat', function(message) {
			console.log("chat message received on server socket");

			if (message) {
				// broadcast to everyone including the message sender
				self.io.emit('messageReceived', message);
			}
		});
	}
    
}

module.exports = SocketServer;
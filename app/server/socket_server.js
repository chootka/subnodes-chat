var _ = require('underscore')
	,User = require('../public/js/models/user');


var SocketServer = function(options) {
	
    var self = this;

    self.io = options.io;

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

				var newUser = { username: username, socket: socket };
				
				// can i sync the local self.users arr to the users collection on client side?
				self.users.push(newUser);

				self.setResponseListeners(newUser);
				
				socket.emit('welcome');
				self.io.sockets.emit('userJoined', username);
		    }
		});
	}

	self.setResponseListeners = function(user) {

		user.socket.on('disconnect', function() {
			console.log("socket has disconnected");

		    self.users.splice(self.users.indexOf(user), 1);
		    self.io.sockets.emit('userLeft', user.username);
		});

		user.socket.on('onlineUsers', function() {

			console.log('socket is getting online users');

		    var users = _.map(self.users, function(u) {

				return u.username;
		    });
		    
		    user.socket.emit('onlineUsers', users);
		});
		
		user.socket.on('chat', function(chat) {
			if (chat) {
				self.io.sockets.emit('chat', {sender: user.username, message: chat});
			}
		});
	}
    
}

module.exports = SocketServer;
_ = require('underscore');

var Chat = function(options) {
    var self = this;

    self.io = options.io;

    self.users = [];

    self.init = function() {
	
		// Fired upon a connection
		self.io.on("connection", function(socket) {
			console.log("chat server has connected to client socket id " + socket.id);
		    self.handleConnection(socket);
		});
    }


    self.handleConnection = function(socket) {
		// wait for a login
		socket.on('join', function(username) {

		    var nameBad = !username || username.length < 3 || username.length > 10;

		    if (nameBad) {
				socket.emit('usernameBad', username);
				return;
		    }

		    
		    var nameExists = _.some(self.users, function(item) {
				return item.user == username;
		    });

		    
		    if (nameExists) {
				socket.emit("usernameExists", username);
		    } else {
				var newUser = new User({ user: username, socket: socket });
				
				self.users.push(newUser);

				self.setResponseListeners(newUser);
				
				socket.emit("welcome");
				self.io.sockets.emit("userJoined", newUser.user);
		    }
		});

    }
    
    self.setResponseListeners = function(user) {
		user.socket.on('disconnect', function() {
		    self.users.splice(self.users.indexOf(user), 1);
		    self.io.sockets.emit("userLeft", user.user);
		});


		user.socket.on("onlineUsers", function() {

		    var users = _.map(self.users, function(item) {
				return item.user;
		    });
		    
		    user.socket.emit("onlineUsers", users);
		});

		user.socket.on("chat", function(chat) {
		    if (chat) {
				self.io.sockets.emit("chat", { sender: user.user, message: chat });
		    }
		});
    }
    
}

module.exports = Chat;
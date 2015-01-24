var AmpersandModel = require('ampersand-model')
    ,Message = require('./message')
    ,Messages = require('./messages')
    ,User = require('./user')
    ,Users = require('./users');


module.exports = AmpersandModel.extend({

	// properties
    props: {
        id: ['string'],
        users: new Users(),
        messages: new Messages()
    },
    derived: {
    },

    // methods
    addUser: function(username) {
    	this.get('users').add(new User({name: username}));
    },
    removeUser: function(username) {
    	var users = this.get('users');
    	var u = users.find( function(k) { 
    		return k.get('name') == username;
    	});
    	if (u) {
    		users.remove(u);
    	}
    },
    addMessage: function(message) {
    	this.get('messages').add(new Message({sender: message.sender, message: message.message}));
    }

});

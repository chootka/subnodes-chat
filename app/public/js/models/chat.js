var AmpersandModel = require('ampersand-model')
    ,Messages = require('./messages')
    ,Users = require('./users');


module.exports = AmpersandModel.extend({
    props: {
        id: ['string']
    },
    derived: {
    },
 
	// method for adding new chat to userChats collection
	addChat: function(chat) {
		this.get('messages').add(new Message({sender: chat.sender, message: chat.message}));
	},

	addUser: function(user) {
		this.get('users').add(new User({username: user.username}));
	}
});

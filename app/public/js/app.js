// Application Controller

var _ = require('underscore')
    ,logger = require('andlog')
    ,config = require('clientconfig')
    ,domReady = require('domready')
    ,io = require('socket.io-client')

    // socket client
    ,SocketClient = require('./socket_client')

    // router! ~(=.= ~)
    ,Router = require('./router')

    // views (> @__@)>
    ,MainView = require('./views/main')

    // models (^__^ )b
    ,Login = require('./models/login')
    ,Chat = require('./models/chat')
    ,Users = require('./models/user-collection')
    ,Messages = require('./models/message-collection');

// exports
module.exports = {

    // this is the the whole app init
    init: function () {

        var self = window.app = this;

        // Socket.io
        this.socketClient = new SocketClient( {io: io} );

        // Router
        this.router = new Router();

        // Models
        this.messages = new Messages();
        this.chat = new Chat();
        
        // Collections
        this.users = new Users(); // is this ever actually used? seems like no
        this.login = new Login();

        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady(function () {

            // init our main view
            var mainView = self.view = new MainView({
                model: self.login,
                el: document.body
            });

            // ...and render it
            mainView.render();
            
            // start io connection
            self.socketClient.connect();

            // we have what we need, we can now start our router and show the appropriate page
            self.router.history.start({pushState: true, root: '/'});
        });
    },


    // methods

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    }

    // example of manually adding a user
    // app.users.add([
    //     {socket: {}, username: 'chootka', message: ''}
    // ]);

    // // example of getting just the username or last message of a user
    // app.users.map(function (user) { return user.username; });
    // app.users.map(function (user) { return user.message; });

    // user.on('change:message', someFunc);
    // user.message = this.$('#msgInput').text(); // fires change event above

};

// run it
module.exports.init();

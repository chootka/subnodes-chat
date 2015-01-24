// libraries
var _ = require('underscore')
    ,logger = require('andlog')
    ,config = require('clientconfig')
    ,io = require('socket.io-client')
    ,domReady = require('domready')

    // router!
    ,Router = require('./router')

    // views ( @__@)
    ,MainView = require('./views/main')

    // models (^__^)b
    ,Main = require('./models/main')
    ,Users = require('./models/users')
    ,Messages = require('./models/messages');


// exports
module.exports = {
    // this is the the whole app init
    init: function () {
        var self = window.app = this;

        // create our global 'main' object
        window.main = new Main();

        // init our URL handlers and the history tracker
        this.router = new Router();
        this.users = new Users();
        this.messages = new Messages();

        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady(function () {
            // init our main view
            var mainView = self.view = new MainView({
                model: main,
                el: document.body
            });

            // ...and render it
            mainView.render();

            // init io + create even listeners
            this.socket = io.connect('http://localhost:8080');
            this.socket.on('connect_error', function(err) { console.log('Error connecting to ' + url, error); });
            this.socket.on('connect', function() { console.log("connect"); });
            this.socket.on('event', function(data) { console.log("event"); });
            this.socket.on('disconnect', function() { console.log("disconnect"); });

            // we have what we need, we can now start our router and show the appropriate page
            self.router.history.start({pushState: true, root: '/'});
        });
    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    }
};

// run it
module.exports.init();

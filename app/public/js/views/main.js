/*global app, $*/
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var _ = require('underscore') // remove
    ,View = require('ampersand-view')
    ,ViewSwitcher = require('ampersand-view-switcher')
    ,domify = require('domify')
    ,dom = require('ampersand-dom')
    ,templates = require('../templates')
    ,setFavicon = require('favicon-setter');


module.exports = View.extend({
    template: templates.body,
    events: {
        'click a[href]': 'handleLinkClick' // remove
    },


    // methods
    
    initialize: function () {

        this.listenTo(app.router, 'page', this.handleNewPage);
    
        this.listenTo(app.users, "add", this.userAdded, this);
        this.listenTo(app.users, "remove", this.userRemoved, this);

        this.listenTo(app.messages, "add", this.renderChat, this);
        this.listenTo(app.messages, "remove", this.renderChats, this);
        this.listenTo(app.messages, "reset", this.renderChats, this);
    },
    render: function () {

        // some additional stuff we want to add to the document head
        document.head.appendChild(domify(templates.head()));

        // main renderer
        this.renderWithTemplate({login: app.login});

        // init and configure our page switcher
        this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
            
            show: function (newView, oldView) {
                
                document.title = newView.pageTitle || 'Hot Probs';
                document.scrollTop = 0;

                // add a class specifying it's active
                dom.addClass(newView.el, 'active');

            }
        });

        //setFavicon('/images/hotprobs.png');
        return this;
    },

    // event handlers

    handleNewPage: function (view) {

        // tell the view switcher to render the new one
        this.pageSwitcher.set(view);
    },

    handleLinkClick: function (e) { // remove

        var aTag = e.target;
        var local = aTag.host === window.location.host;

        // if it's a plain click (no modifier keys)
        // and it's a local url, navigate internally
        if (local && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && !e.defaultPrevented) {
            e.preventDefault();
            app.navigate(aTag.pathname);
        }
    },

    addMessage: function(username, message) {

        console.log("addMessage, notified in main.js view");


        var u = app.users.find( function(user) { 
            return user.get('username') == username;
        });
        if (u) {
            app.messages( new Message({user: user, message: message}) );
        }
    },
    userAdded: function() {
        console.log("user added to users-collection, notified in main.js view");
    },
    userRemoved: function() {
        console.log("user removed from users-collection, notified in main.js view");
    },
    renderChat: function() {
        console.log("renderChat, message added to messages-collection, notified in main.js view");
    },
    renderChats: function() {
        console.log("renderChats, message removed from messages-collection, notified in main.js view");
    }
});

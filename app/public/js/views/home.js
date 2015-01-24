/*global app, me, $*/
// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders itself on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var _ = require('underscore');
var domify = require('domify');
var dom = require('ampersand-dom');
var templates = require('../templates');
var setFavicon = require('favicon-setter');


module.exports = View.extend({
    template: templates.body,
    initialize: function () {
        // this marks the correct nav item selected
        // this.listenTo(app.router, 'page', this.handleNewPage);
    },
        'click #buttonWrapper': 'joinClick'
    },
    render: function () {
        // some additional stuff we want to add to the document head
        // document.head.appendChild(domify(templates.head()));

        // // main renderer
        // this.renderWithTemplate({main: main});

        // // init and configure our page switcher
        // this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'), {
        //     show: function (newView, oldView) {
        //         // it's inserted and rendered for me
        //         document.title = _.result(newView, 'pageTitle') || 'Hot Probs';
        //         document.scrollTop = 0;

        //         // add a class specifying it's active
        //         dom.addClass(newView.el, 'active');

        //         // store an additional reference, just because
        //         app.currentPage = newView;
        //     }
        // });

        // // setting a favicon for fun (note, it's dynamic)
        // //setFavicon('/images/ampersand.png');
        // return this;
    },

    joinClick: function (e) {
        e.preventDefault();
        console.log("join clicked");
    }
});

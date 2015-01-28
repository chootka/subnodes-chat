var PageView = require('./base')
    ,templates = require('../templates')
    ,messagesView = require('../views/message');


module.exports = PageView.extend({
    pageTitle: 'Hot Probs – Login',
    template: templates.pages.messages

    // methods

    render: function () {

        console.log("render login messages collection");

        this.renderCollection(this.collection, messagesView, this.queryByHook('incoming'));
        if (!this.collection.length) {
            this.fetchCollection();
        }
    },
    fetchCollection: function () {
        this.collection.fetch();
        return false;
    }
});


// This app view is responsible for rendering the join chat screen.

var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.join,
    events: {
        'click #joinButton': 'onJoin'
    },
    initialize: function () {
        this.listenTo(this.model, 'change:error', this.render, this);
    },
    render: function () {

        // main renderer
        this.renderWithTemplate({join: join});

        return this;
    },
    onJoin: function() {
        // validate that screenname isn't blank before proceeding
        this.vent.trigger("login", this.$('#username').val());
    }
});

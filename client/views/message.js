var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.message,
    bindings: {
        'model.message': '[data-hook~=message]',
        'model.username': '[data-hook~=name]',
        'model.avatar': {
            type: 'attribute',
            hook: 'avatar',
            name: 'src'
        },
    },
    events: {
        'click [data-hook~=action-delete]': 'handleRemoveClick'
    },
    handleRemoveClick: function () {
        this.model.destroy();
        return false;
    }
});

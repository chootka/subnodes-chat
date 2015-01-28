var View = require('ampersand-view')
    ,templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.user,
    bindings: {
        'model.username': '[data-hook=username]',
        'model.message': '[data-hook=message]'
    },


    // methods
    
    initialize: function () {

    },
    // render: function () {

    //     // main renderer
    //     this.renderWithTemplate({message: this.model});

    //     return this;
    // },

    delete: function() {
        
        this.model.destroy();
        return false;
    }
});

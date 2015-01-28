var Collection = require('ampersand-rest-collection');
    ,Message = require('./message');


module.exports = Collection.extend({
    model: User,
    url: '/api/messages'
});


// module.exports = View.extend({
//     template: templates.includes.message,
//     events: {
//     },


//     // methods
    
//     initialize: function () {

//     },
//     render: function () {

//         // main renderer
//         this.renderWithTemplate({message: this.model});

//         return this;
//     },

//     delete: function() {
//         // e.preventDefault();
//         this.model.destroy();
//     }
// });

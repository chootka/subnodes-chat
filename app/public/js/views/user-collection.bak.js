var Collection = require('ampersand-rest-collection');
    ,User = require('./user');


module.exports = Collection.extend({
    model: User,
    url: '/api/users'
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

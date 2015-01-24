var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'join',
    template: templates.pages.join
});

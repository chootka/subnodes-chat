var _ = require('underscore');

var users = [
    // {
    //     id: 0,
    //     username: '',
    //     socket: {},
    // }
];

var messages = [
    // {
    //     id: 0,
    //     user: {},
    //     message: ''
    // }
];

var id = 0;

function get(collection, id) {
    return _.findWhere(collection, {id: parseInt(id + '', 10)});
}

exports.name = 'api';
exports.version = '0.0.0';
exports.register = function (plugin, options, next) {
    plugin.route({
        method: 'GET',
        path: '/api/users',
        handler: function (request, reply) {
            reply(users);
        }
    });

    plugin.route({
        method: 'POST',
        path: '/api/users',
        handler: function (request, reply) {
            var user = request.payload;
            user.id = id++;
            users.push(user);
            reply(user).code(201);
        }
    });

    plugin.route({
        method: 'GET',
        path: '/api/users/{id}',
        handler: function (request, reply) {
            var found = get(users, request.params.id);
            reply(found).code(found ? 200 : 404);
        }
    });

    plugin.route({
        method: 'DELETE',
        path: '/api/users/{id}',
        handler: function (request, reply) {
            var found = get(users, request.params.id);
            if (found) users = _.without(users, found);
            reply(found).code(found ? 200 : 404);
        }
    });

    plugin.route({
        method: 'PUT',
        path: '/api/messages/{id}',
        handler: function (request, reply) {
            var found = get(messages, request.params.id);
            if (found) _.extend(found, request.payload);
            reply(found).code(found ? 200 : 404);
        }
    });


    plugin.route({
        method: 'GET',
        path: '/api/messages',
        handler: function (request, reply) {
            reply(messages);
        }
    });

    plugin.route({
        method: 'POST',
        path: '/api/messages',
        handler: function (request, reply) {
            var message = request.payload;
            message.id = id++;
            messages.push(message);
            reply(user).code(201);
        }
    });

    plugin.route({
        method: 'GET',
        path: '/api/messages/{id}',
        handler: function (request, reply) {
            var found = get(messages, request.params.id);
            reply(found).code(found ? 200 : 404);
        }
    });

    plugin.route({
        method: 'DELETE',
        path: '/api/messages/{id}',
        handler: function (request, reply) {
            var found = get(messages, request.params.id);
            if (found) messages = _.without(messages, found);
            reply(found).code(found ? 200 : 404);
        }
    });

    plugin.route({
        method: 'PUT',
        path: '/api/messages/{id}',
        handler: function (request, reply) {
            var found = get(messages, request.params.id);
            if (found) _.extend(found, request.payload);
            reply(found).code(found ? 200 : 404);
        }
    });

    next();
};

// exports.addMessage = function(req, res) {
//     var message = req.body;
//     message.id = id++;
//     messages.push(message);
//     res.status(201).send(message);
// }

// exports.getMessages = function(req, res) {
//     res.send(messages);
// }

// exports.addUser = function (req, res) {
//     var user = req.body;
//     user.id = id++;
//     users.push(user);
//     res.status(201).send(user);
// };

// exports.getUsers = function (req, res) {
//     res.send(users);
// };

// exports.deleteUser = function (req, res) {
//     var found = get(req.params.id);
//     if (found) users = _.without(users, found);
//     res.status(found ? 200 : 404);
//     res.send(found);
// };
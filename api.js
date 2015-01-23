var _ = require('underscore');

function get(id) {
    return _.findWhere(users, {id: parseInt(id + '', 10)});
}

exports.list = function (req, res) {
    res.send(users);
};

exports.addUser = function (req, res) {
    var user = req.body;
    user.id = id++;
    users.push(user);
    res.status(201).send(user);
};

exports.getUser = function (req, res) {
    var found = get(req.params.id);
    res.status(found ? 200 : 404);
    res.send(found);
};

exports.deleteUser = function (req, res) {
    var found = get(req.params.id);
    if (found) users = _.without(users, found);
    res.status(found ? 200 : 404);
    res.send(found);
};

exports.updateUser = function (req, res) {
    var found = get(req.params.id);
    if (found) _.extend(found, req.body);
    res.status(found ? 200 : 404);
    res.send(found);
};

exports.addMessage = function (req, res) {
    var message = req.body;
    message.id = id++;
    messages.push(message);
    res.status(201).send(message);
};
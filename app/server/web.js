/* global console */
var path = require('path')
    ,config = require('getconfig')
    ,app = require('express')()
    ,compress = require('compression')
    ,serveStatic = require('serve-static')
    ,cookieParser = require('cookie-parser')
    ,bodyParser = require('body-parser')
    ,server = require('http').createServer(app)
    ,io = require('socket.io')(server)
    ,MoonbootsCfg = require('./moonboots_config')
    ,Chat = require('./chat');


// -----------------
// Configure express
// -----------------
app.use(compress());
app.use(serveStatic(path.resolve(path.normalize('public'))));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use Jade for template engine
app.set('view engine', 'jade');


// --------------------------
// Set up our API
// --------------------------
var api = require('./api');
app.get('/api/users', api.list);
app.get('/api/users/:id', api.getUser);
app.delete('/api/users/:id', api.deleteUser);
app.put('/api/users/:id', api.updateUser);
app.post('/api/users', api.addUser);
app.post('/api/messages', api.addMessage);


// ----------------------------
// Set our client config cookie
// ----------------------------
app.use(function (req, res, next) {
    res.cookie('config', JSON.stringify(config.client));
    next();
});


// ---------------------------------------------------
// Configure Moonboots to serve our client application
// ---------------------------------------------------
new MoonbootsCfg({ app: app, config: config }).init();


// ----------------------
// Set up our HTTP server
// ----------------------
server.listen(config.http.port);
console.log('Hot Probs is running at: http://localhost:' + config.http.port + '.');


// ---------------------------------------------------
// Set up socket.io listeners for our chat application
// ---------------------------------------------------
new Chat({ io: io }).init();

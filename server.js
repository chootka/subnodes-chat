/* global console */
var path = require('path')
    ,express = require('express')
    //,helmet = require('helmet')
    ,bodyParser = require('body-parser')
    ,cookieParser = require('cookie-parser')
    ,Moonboots = require('moonboots-express')
    ,compress = require('compression')
    ,config = require('getconfig')
    ,semiStatic = require('semi-static')
    ,serveStatic = require('serve-static')
    ,stylizer = require('stylizer')
    ,templatizer = require('templatizer')
    ,app = express()
    ,server = require('http').createServer(app)
    ,io = require('socket.io')(server);

// TBD
// var moonbootsConfig = require('./moonbootsConfig')
// var ioConfig = require('./ioConfig')

// a little helper for fixing paths for various environments
var fixPath = function (pathString) {
    return path.resolve(path.normalize(pathString));
};


// -----------------
// Configure express
// -----------------
app.use(compress());
app.use(serveStatic(fixPath('public')));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'jade');


// -----------------
// Set up our little demo API
// -----------------
var api = require('./api');
app.get('/api/users', api.list);
app.get('/api/users/:id', api.getUser);
app.delete('/api/users/:id', api.deleteUser);
app.put('/api/users/:id', api.updateUser);
app.post('/api/users', api.addUser);
app.post('/api/messages', api.addMessage);


// -----------------
// Set our client config cookie
// -----------------
app.use(function (req, res, next) {
    res.cookie('config', JSON.stringify(config.client));
    next();
});


// -----------------
// Set up socket.io listeners
// -----------------
io.on('connection', function(socket) {
    console.log("Client " + socket.id + " connected.");
});


// ---------------------------------------------------
// Configure Moonboots to serve our client application
// ---------------------------------------------------
new Moonboots({
	moonboots: {
        jsFileName: 'app',
        cssFileName: 'app',
        main: fixPath('client/app.js'),
        developmentMode: config.isDev,
        libraries: [
        ],
        stylesheets: [
            fixPath('public/css/bootstrap.css'),
            fixPath('public/css/app.css')
        ],
        browserify: {
            debug: false
        },
        beforeBuildJS: function () {
            // This re-builds our template files from jade each time the app's main
            // js file is requested. Which means you can seamlessly change jade and
            // refresh in your browser to get new templates.
            if (config.isDev) {
                templatizer(fixPath('templates'), fixPath('client/templates.js'));
            }
        },
        beforeBuildCSS: function (done) {
            // This re-builds css from stylus each time the app's main
            // css file is requested. Which means you can seamlessly change stylus files
            // and see new styles on refresh.
            if (config.isDev) {
                stylizer({
                    infile: fixPath('public/css/app.styl'),
                    outfile: fixPath('public/css/app.css'),
                    development: true
                }, done);
            } else {
                done();
            }
        }
    },
    server: app
});


// listen for incoming http requests on the port as specified in our config
server.listen(config.http.port);
console.log('Hot Probs is running at: http://localhost:' + config.http.port + '.');

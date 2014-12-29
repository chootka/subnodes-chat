/**
 * Hot Probs is a simple chat room built with Node.js
 * Author : Sarah Grant
 * Github : http://github.com/chootka/hotprobs
 * License: 
 */

/**
 * Module dependencies.
 */
var express   = require('express'),
	app         = express(),
  http        = require('http'),
  server      = http.createServer(app),
  io          = require('socket.io').listen(server);

  app.root    	= __dirname;

// create the application
require('./app/config')(app, express);
require('./app/server/router')(app);
//require('./app/server/db')
require('./app/server/modules/chat')(io);
require('./app/server/modules/pchat')(io);

// fire up the server
server.listen(8080, function() {
  console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});

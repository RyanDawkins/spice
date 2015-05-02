var http = require('http');
var config = require('config');
var entry = require('entry');
var www = require('www');
var url = require('url');
var fs = require('fs');

var port = config.server.port;
var host = config.server.host;

// This will be the callback for finishing the load routes.
var startServer = function(entry) {
  http.createServer(function receive(req, res) {
    var urlData = url.parse(req.url);
    console.log("Request: "+req.method+" "+urlData.pathname);

    var pathSplit = urlData.pathname.split(".");
    var prefix = pathSplit[0];
    var suffix = pathSplit.length > 1
      ? pathSplit[1]
      : "json";

    console.log(entry.getCallbacks());

    var callback = entry.getPathCallback(req.method, prefix);
    if(callback) {
      callback(req, res, www.getWriter(suffix));
    } else {
      www.notFound(req, res);
    }

  }).listen(port, host);
  console.log('Server running at http://'+host+':'+port);
}

var loadRoutes = function() {
  fs.readdir('./routes', function(err, files) {
    for(var i = 0; i < files.length; i++) {
      var callbacks = require("./routes/"+files[i]).entry.callbacks;
      entry.extend(callbacks);
    }

    startServer(entry);
  });
};

loadRoutes();

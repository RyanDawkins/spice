var http = require('http');
var config = require('config');
var entry = require('entry');
var www = require('www');
var url = require('url');
var routes = require('');

var port = config.server.port;
var host = config.server.host;

http.createServer(function (req, res) {

  var urlData = url.parse(req.url);
  console.log("Request to: "+urlData.pathname);

  entry.getPathCallback(req.method, urlData.pathname);

}).listen(port, host);

console.log('Server running at http://'+host+':'+port);

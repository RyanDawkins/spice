var entry = require('entry');

entry.get('/hello', function(req, res, writer){
  writer(req, res, {
    message: "Hello World"
  });
});

exports.entry = entry;

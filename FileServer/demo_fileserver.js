// include the http module
var http = require('http');
// include the url module
var url = require('url');
// include the fs module to allow you to work with the file system on computer.
var fs = require('fs');

// create a server object
http.createServer(function (req, res) {
  var query = url.parse(req.url, true);
  // contains the file pathname
  var filename = "." + query.pathname;
  // read the file
  fs.readFile(filename, function(err, data) {
    // if anything goes wrong, throw a 404 error
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080); 

// use http://localhost:8080/template1.html

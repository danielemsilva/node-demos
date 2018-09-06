// include the http module
var http = require('http');
// include the fs module to allow you to work with the file system on computer.
var fs = require('fs');

// create a server object
http.createServer(function (req, res) {
  // read the file 'demofile1' on computer
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'}); // write a response to the client
    res.write(data); // write the file content to the client
    res.end(); // end the response
  });
}).listen(8080);

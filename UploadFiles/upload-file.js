var http = require('http');
var formidable = require('formidable');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.write('File uploaded');
      res.end();
    });
  } else {
    fs.readFile('form.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'}); // write a response to the client
      res.write(data); // write the file content to the client
      return res.end(); // end the response
    });
  }
}).listen(8080);

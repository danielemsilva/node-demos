var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/Public/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
  } else {
    fs.readFile('form.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'}); // write a response to the client
      res.write(data); // write the file content to the client
      return res.end(); // end the response
    });
  }
}).listen(8080);

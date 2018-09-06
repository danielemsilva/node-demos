const server = require('http').createServer();

server.on('request', (req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain'});
  res.write('First message\n');

  setTimeout(function() {
    res.write('Second message\n');
  }, 5000);

  setTimeout(function() {
    res.write('Third message\n');
  }, 10000);
});

server.listen(8000);

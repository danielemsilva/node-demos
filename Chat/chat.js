const server = require('net').createServer();
let counter = 0;
let sockets = {};

function timestamp() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}

server.on('connection', socket => {
  // Manages the ids
  socket.id = counter++;
  // Output to server
  console.log('Client connected');
  // Output to client
  socket.write('Please type your name: ');

  socket.on('data', data => {
    if (!sockets[socket.id]) {
      socket.name = data.toString().trim();
      socket.write(`Welcome ${socket.name}!\n`);
      sockets[socket.id] = socket;
      return;
    }
    // Scrolls the sockets object and ensures that
    // the function is executed for all sockets
    Object.entries(sockets).forEach(([key, clientSocket]) => {
      if (socket.id != key) {
        // Identifies the owner of the message
        clientSocket.write(`${socket.name} (${timestamp()}): `);
        // Writes the message to all connected clients
        clientSocket.write(data);
      }
    });
  });

  socket.on('end', () => {
    // Deletes the current socket of the socket list
    delete sockets[socket.id];
    console.log('Client disconnected');
  });
});

server.listen(8000, () => console.log('Server bound'));

const EventEmitter = require('events');
const readline = require('readline');

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new EventEmitter();
const server = require('./server')(client);

server.on('response', (resp) => {
  // Writes the response from the server
  process.stdout.write(resp);
  process.stdout.write('\n\> ');
});

let command, args;
read.on('line', (input) => {
  // With the split, the first object will be the command
  // and the rest will be the arguments that will be in the variable args
  [command, ...args] = input.split(' ');
  // The command and arguments are passed to the emited event
  client.emit('command', command, args);
});

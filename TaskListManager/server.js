const EventEmitter = require('events');

class Server extends EventEmitter {
  constructor(client) {
    super();
    this.tasks = {};
    this.taskId = 1;
    // First message sent to the client
    process.nextTick(() => {
      this.emit('response',
        'Type a command (help to list commands)'
      );
    });
    client.on('command', (command, args) => {
      switch (command) {
        case 'help':
        case 'add':
        case 'ls':
        case 'delete':
          // Calls the respective function passing the arguments sent by the client
          this[command](args);
          break;
        default:
          this.emit('response', 'Unknown command');
        }
    });
  }

  help() {
    // Emits a response with available commands
    this.emit('response', 'Available commands: \nadd tasks\nls\ndelete :id');
  }

  add(args) {
    // Adds the new task to the Tasks object
    this.tasks[this.taskId] = args.join(' ');
    // Emits a response to the client that has been added the task
    this.emit('response', `Added task ${this.taskId}`);
    this.taskId++;
  }

  ls() {
    // Lists all tasks by calling the tasksToString
    this.emit('response', `Tasks:\n${this.tasksToString()}`);
  }

  delete(args) {
    // Delete the task in the position passed by parameter
    delete(this.tasks[args[0]]);
    // Emits a response to the client that has been deleted the task
    this.emit('response', `Deleted task ${args[0]}`);
  }

  tasksToString() {
    // Performs a key mapping of the Tasks object,
    // stores the task information in a string,
    // and at the end joins everything in a new string
    return Object.keys(this.tasks).map(key => {
      return `${key}: ${this.tasks[key]}`;
    }).join('\n');
  }

}

module.exports = (client) => new Server(client);

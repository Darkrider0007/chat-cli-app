const readline = require("readline");
const io = require("socket.io-client");
const yargs = require("yargs");

const argv = yargs.option("user", {
  alias: "u",
  describe: "Username for chat",
  type: "string",
  demandOption: false,
}).argv;

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let username = argv.user;

function promptUsername() {
  rl.question("Enter your username: ", (name) => {
    username = name.trim();
    if (username.length === 0) return promptUsername();
    connect();
  });
}

function connect() {
  socket.emit("join", username);
  rl.setPrompt(`${username}> `);
  rl.prompt();

  rl.on("line", (input) => {
    socket.emit("chat message", input.trim());
    rl.prompt();
  });
}

if (!username) {
  promptUsername();
} else {
  connect();
}

socket.on("chat message", (msg) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(msg);
  rl.prompt(true);
});

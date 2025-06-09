#!/usr/bin/env node

const readline = require("readline");
const { URL } = require("url");

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Usage: chatcli <chatcli://host:port?user=YourName>");
  process.exit(1);
}

const link = args[0];
let parsed;
try {
  const url = new URL(link.replace("chatcli://", "http://")); // simulate URL parsing
  parsed = {
    host: url.host,
    user: url.searchParams.get("user"),
  };
} catch {
  console.error("❌ Invalid link format.");
  process.exit(1);
}

if (!parsed.user) {
  console.error("❌ Username is missing in the link.");
  process.exit(1);
}

const protocol = parsed.host.includes("localhost") ? "http" : "https";
const socket = require("socket.io-client")(`${protocol}://${parsed.host}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.emit("join", parsed.user);
rl.setPrompt(`${parsed.user}> `);
rl.prompt();

rl.on("line", (input) => {
  socket.emit("chat message", input.trim());
  rl.prompt();
});

socket.on("chat message", (msg) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(msg);
  rl.prompt(true);
});

# 💬 CLI Chat Application

A simple, real-time command-line chat application using **Node.js** and **Socket.IO**, where users can join using a custom `chatcli://` link.

## 🚀 Features

- Real-time communication over CLI
- Join via link like: `chatcli://localhost:3000?user=Rohan`
- Broadcast messages to all connected users
- Join/leave notifications
- Clean CLI interface with prompt and message separation

---

## 📦 Tech Stack

- Node.js
- Socket.IO (client & server)
- readline (for CLI)
- yargs / custom parsing
- Executable CLI command via `bin/`

---

## 🗂 Folder Structure

chat-cli-app/
├── bin/
│   └── chatcli.js        # Executable CLI chat command
├── client/
│   └── index.js          # (legacy client, now optional)
├── server/
│   └── index.js          # Socket.IO server
├── package.json
└── README.md

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chat-cli-app.git
cd chat-cli-app
````

### 2. Install Dependencies

```bash
npm install
```

---

## 🔌 Start the Chat Server

```bash
npm run start-server
```

Or manually:

```bash
node server/index.js
```

---

## 💬 Join the Chat from Terminal

You can join using a link-like format:

```bash
chatcli "chatcli://localhost:3000?user=YourName"
```

This starts the CLI client and connects you as `YourName` to the chat server.

---

## 🛠️ Install the `chatcli` Command Globally

To use `chatcli` from anywhere:

```bash
npm install -g .
```

Now you can run:

```bash
chatcli "chatcli://localhost:3000?user=Rohan"
```

---

## 💡 Example

1. Open Terminal 1:

```bash
npm run start-server
```

2. Open Terminal 2:

```bash
chatcli "chatcli://localhost:3000?user=Rohan"
```

3. Open Terminal 3:

```bash
chatcli "chatcli://localhost:3000?user=Anjali"
```

---

## 📄 Custom Protocol Format

Use the following pattern:

```
chatcli://<host>:<port>?user=<username>
```

✅ Example:

```
chatcli "chatcli://localhost:3000?user=Rohan"
```


## 📝 License

MIT License
Made with ❤️ by **Rohan Gope**

---

## 📬 Contact
* 🔗 LinkedIn: [linkedin.com/in/rohan-gope](https://linkedin.com/in/rohan-gope)

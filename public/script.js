let socket;
let username = "";

function joinChat() {
  username = document.getElementById("username").value.trim();
  if (!username) return alert("Enter a name");

  // Ensure browser allows sound after user interaction
  const sound = document.getElementById("notifySound");
  sound
    .play()
    .then(() => sound.pause())
    .catch(() => {});

  socket = io();
  socket.emit("join", username);

  document.getElementById("joinSection").style.display = "none";
  document.getElementById("chatSection").style.display = "block";

  socket.on("chat message", (msgObj) => {
    const chat = document.getElementById("chat");
    const el = document.createElement("div");
    el.className = `msg ${msgObj.user === username ? "self" : ""}`;
    el.innerHTML = `
      <strong>${msgObj.user}</strong>
      <div class="content">${msgObj.message}</div>
      <span class="timestamp">${msgObj.time}</span>
    `;
    chat.appendChild(el);
    chat.scrollTop = chat.scrollHeight;

    // Play sound if the message is from someone else
    if (msgObj.user !== username) {
      const sound = document.getElementById("notifySound");
      sound.currentTime = 0;
      sound.play().catch((err) => console.warn("Sound blocked:", err));
    }
  });
}

function sendMessage() {
  const msgInput = document.getElementById("message");
  const msg = msgInput.value.trim();
  if (msg && socket) {
    socket.emit("chat message", msg);
    msgInput.value = "";
  }
}

function handleKey(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

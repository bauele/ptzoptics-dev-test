import { Server } from "socket.io";

const io = new Server(3000, {
  /* options */
});

io.on("connection", (socket) => {
  // ...
});

const ipAddress = "ip";
const port = "port";

(async function sendServerInfo() {
  let response = await fetch("http://localhost:8080", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ipAddress: ipAddress, port: port }),
  });
  let data = response.status;
  console.log(data);
})();

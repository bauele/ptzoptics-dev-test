require("dotenv").config();
const net = require("net");

//  Read in the provided IP address and port
//  If this cannot be found, inform the user
(function getConfigurationValues() {
  if (
    !process.env.IP_ADDRESS ||
    !process.env.PORT ||
    !process.env.TEST_ADDRESS
  ) {
    console.log(
      "Error: Could not obtain ip address and/or port from .env file. Please refer to example.env for more information."
    );

    //  Exit with code 1
    process.exit(1);
  }

  //  Print out obtained configuration values
  console.log(
    `Obtained following configuration values: \nServer IP: ${process.env.IP_ADDRESS} \nServer Port: ${process.env.PORT}\nTest Address: ${process.env.TEST_ADDRESS}`
  );
})();

//  Create the TCP server
const server = net.createServer((socket: any) => {
  console.log("Recieved connection");

  //  Handle data received from the client
  socket.on("data", (data: any) => {
    console.log("Recieved data");
    socket.write("Thank you for connecting!");
  });

  //  Handle client disconnection
  socket.on("end", () => {
    console.log("Client disconnected");
  });

  //  Handle errors
  socket.on("error", (err: any) => {
    console.error("An error occured: ", err);
  });
});

//  Start the TCP server
server.listen(process.env.PORT, () => {
  console.log(`TCP server is listening on port ${process.env.PORT}`);
});

//  Send IP address and port to remote server
(async function sendServerInfo() {
  let response = await fetch(`${process.env.TEST_ADDRESS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ipAddress: `${process.env.IP_ADDRESS}`,
      port: Number(process.env.PORT),
    }),
  });
  let status = response.status;
  console.log(status);
})();

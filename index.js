const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ server: server });

//port where this microservice is hosted
const PORT = 8080;

const ERROR = "Please enter a valid temperature (number followed by f or c)";
wss.on("connection", function connection(ws) {
  //Triggered whenever a new client connects
  console.log("A new client connected");
  ws.send("Welcome New Client");

  //Triggered when a new message is received
  ws.on("message", async function incoming(message) {
    ws.on("error", console.error);

    console.log("received: %s", message);
    let foc = farOrCel(message.toString());
    let num = getNum(message);
    temp = convertTemp(num, foc);
    if (temp == NaN || foc == "error" || num == NaN) {
      temp = ERROR;
    }
    ws.send(`Microservice response: ${temp}`);
  });
});

function farOrCel(str) {
  const foc = str[str.length - 1].toLowerCase();
  if (foc == "c") {
    return "cel";
  } else if (foc == "f") {
    return "far";
  } else {
    return "error";
  }
}

function getNum(str) {
  let temp = str.slice(0, -1);
  return parseInt(temp);
}

function convertTemp(num, foc) {
  if (foc == "far") {
    return ((num - 32) * (5 / 9)).toFixed(2).toString() + "°C";
  } else if (foc == "cel") {
    return (num * (9 / 5) + 32).toFixed(2).toString() + "°F";
  } else {
    return NaN;
  }
}

app.get("/", (req, res) => res.send("Hello World!"));

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000/");

function connect(cb) {
  socket.on("message", msg => {
    console.log(msg);
    cb(msg);
  });
}

export default { connect };
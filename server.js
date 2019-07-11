const io = require('socket.io')();
const port = 3000;

io.on('connection', (socket) => {
    console.log("User connected");
    socket.on('message', function (msg) {
        console.log(msg);
        io.emit('message', msg);
    });
});

io.listen(port, () => {
    console.log("Listening on port " + port);
});
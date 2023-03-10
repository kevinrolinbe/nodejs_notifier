const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(function(req, res, next) {
    req.io = io;
    next();
});

app.get('/notify', (req, res) => {
    var io = req.io;
    io.emit('key2', 'Notify on query');

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: "OK" }));
});

io.on('connection', (socket) => {
    console.log('Un client vient de se connecter');
});

io.on("connection", (socket) => {
    //...
    socket.on("key", (arg) => {
        console.log(arg);
    });
    //...

    //...
    socket.emit("key2", "value2");
    //...
});

server.listen(5001, () => {
    console.log('listening on *:5001');
});
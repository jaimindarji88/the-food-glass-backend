

const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const Watson    = require('./api/watson');
const Clarifai  = require('./api/clarifai');

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...

console.log("Listening on port: " + LISTEN_PORT );

//io events
io.on('connection', (socket) => {

    console.log(socket.id + " connected");

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected");
    });

    //custom events
    socket.on('getPic', (data) => {
        console.log("pic received");
        console.log(data);
        

        //io.sockets.emit('pic', {});
    });
});
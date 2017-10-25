//server side, when run server.js: the server is up
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

var app = express();//The express() function is a top-level function exported by the express module.
var server = http.createServer(app);
var io = socketIO(server); // setup client and server connection

app.use(express.static(publicPath));//static directory for express, root route is now set to your public folder dir

io.on('connection', (socket) => {
//io listen for a new connection, let client connect and do sth when the connect comes in.
    console.log('New user connected');
    
    //!!create custom event socket to emit  from server side to client(firstArg:name of event, secArg: data(obj))
    socket.emit('newMessage', {
        from:'Chat App Admin',
        text:'Welcome to the chat app',
        createdAt: new Date().getTime()
    });
    //broadcast to everybody but myself
    socket.broadcast.emit('newMessage', {
         from: 'Chat App Admin',
         text: 'New user just joined',
         createdAt: new Date().getTime()
    });
    
    //!create custon event for server to listen
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        //io.emit: emit events to all connected user
        //socket.emit: emit event to sigle user
        io.emit('newMessage', {
            from: message.from, //get data from client-side
            text: message.text,
            createdAt: new Date().getTime()
        });          
    });
    
    socket.on('disconnect', () => {
    //socket listener if user disconnected, do--
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

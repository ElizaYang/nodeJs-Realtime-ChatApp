//!!client side
//call io to ask server open up a web socket to accept connection and keep it open
var socket = io();
//socket event listener: socket.on
socket.on('connect', function () {
    console.log('Connected to server');
    //!!create custom event socket to emit from client side to server(firstArg:name of event, secArg: data(obj))
//    socket.emit('clientMessage', {
//        from: 'client',
//        text: 'hello from client'
//    });
});
socket.on('disconnect', function () {
    console.log('Disonnected from server');
});
//customized event: 'newMessage', create from server.js:socket.emit('newMessage')
socket.on('newMessage', function (message) {
    //pass data from server to client
    console.log('newMessage', message);
});        
  
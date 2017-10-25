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
    //use jQuery create list element
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
}); 
//server acknowledgement//
// socket.emit('createMessage',{
// 	from: 'Client',
// 	text: 'Testtest'
// }, function (data) {
// 	//call back function from server
// 	//server acknowledgement the message received
// 	console.log('received', data);
// });   

jQuery('#message-form').on('submit', function(e) {
	
	e.preventDefault();
	//e is short for event, prevent defualt and
	//set jQuery'submit'function behavior to below
	socket.emit('createMessage', {
		from: 'User',
		//use jQuery to restore form data in html
		//[]select all elements' name == to [name]
		text: jQuery('[name=message]').val()
	}, function () {

	});
});  
  
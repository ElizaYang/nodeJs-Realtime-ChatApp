//!!client side 
//client + server pattern (socket.emit <==> socket.on)
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

//custom new event listener to socket 
socket.on('newLocationMessage', function(locationMessage){
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');

	li.text(`${locationMessage.from}: `);
	a.attr('href', locationMessage.url);
	li.append(a);
	jQuery('#messages').append(li);
});

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
//create selector for send-location button
var locationButton = jQuery('#send-location');
//set button litsener, the function will be called when button clicked
locationButton.on('click', function() {
	if(!navigator.geolocation) {
		//API https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
		return alert('Geolocation not supported by current browser.');
	}

	navigator.geolocation.getCurrentPosition(function (position) {
		//emit location data to server
	    socket.emit('createLocationMessage', {
	      latitude: position.coords.latitude,
	      longitude: position.coords.longitude
	    });
  }, function () {
    alert('Permission denied, unable to fetch location.');
  });
});

  
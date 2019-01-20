var socket = io('http://localhost:3000');

socket.on('connect', function () {
  console.log('connected to server');

  // socket.emit('createEmail', {
  //   to:'andrew@example.com',
  //   text:'Hey what\'s up'
  // });

  socket.emit('createMessage', {
    to:'Jane',
    text:'Hey, How are you?'
  });
});

  socket.on('newMessage', function (message) {
    console.log('New message', message);
  })
// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });



socket.on('disconnect', function () {
  console.log('Disconnected from server!');
})

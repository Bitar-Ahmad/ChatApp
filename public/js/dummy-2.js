var socket = io('http://localhost:3000');

socket.on('connect', function () {
  console.log('connected to server');

  });


  socket.on('newMessage', function (message) {
    console.log('New message', message);
  });

  socket.on('greetings', function (message) {
    console.log('New message from Admin', message);
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from server!');
  });

  socket.emit('createMessage', {
    from:'Frank',
    text:'Hi'
  }, function (data) {
    console.log('Got it!', data);
  });

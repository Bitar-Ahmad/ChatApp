const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');



const publicPath = path.join(__dirname + '/../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;


app.use(express.static(publicPath));
io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.emit('greetings', {
    from:'Admin',
    text:'Welcome to the chatApp',
    createdAt:new Date().getTime()
  });

  socket.broadcast.emit('greetings', {
    from:'Admin',
    text:'New user joined',
    createdAt:new Date().getTime()
  });
  // socket.emit('newEmail', {
  //   from:'ahmed@gmail.com',
  //   text:'Something in here',
  //   createdAt:123
  // });


  // socket.on('createEmail', (newEmail) => {
  //   console.log('CreateEmail', newEmail);
  // });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from:message.from,
      text:message.text,
      createdAt:new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected!');
  })
});



server.listen(port, () => {
  console.log(`Starting server on port: ${port}`);
})

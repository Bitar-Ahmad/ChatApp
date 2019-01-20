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

  // socket.emit('newEmail', {
  //   from:'ahmed@gmail.com',
  //   text:'Something in here',
  //   createdAt:123
  // });

  socket.emit('newMessage', {
    from:'Admin',
    text:'Hello everyone',
    createdAt:new Date().getTime()
  });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('CreateEmail', newEmail);
  // });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected!');
  })
});



server.listen(port, () => {
  console.log(`Starting server on port: ${port}`);
})

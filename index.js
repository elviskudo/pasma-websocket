const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let clients = [];

io.on('connection', (socket) => {
  clients.push(socket);

  socket.on('chat message', (msg) => {
    clients.forEach(client => {
      if (client !== socket) {
        client.emit('chat message', msg);
      }
    });
  });

  socket.on('disconnect', () => {
    clients = clients.filter(client => client !== socket);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

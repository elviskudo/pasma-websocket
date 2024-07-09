const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Atur origin sesuai kebutuhan
    methods: ['GET', 'POST']
  }
});

app.use(cors()); // Tambahkan middleware CORS

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

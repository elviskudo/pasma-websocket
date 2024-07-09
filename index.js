const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

require('dotenv').config;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // Ganti dengan URL frontend Anda jika di-deploy
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// Middleware untuk otorisasi token
const AUTH_TOKEN = process.env.AUTH_TOKEN
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  // Lakukan verifikasi token disini
  if (token === AUTH_TOKEN) { // Ganti dengan logika verifikasi token yang sesuai
    next();
  } else {
    next(new Error("Unauthorized"));
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Contoh penanganan pesan dari klien
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

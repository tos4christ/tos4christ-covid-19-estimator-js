import http from 'http';
import socketIo from 'socket.io';
import app from './app';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
  socket.username = 'Alisha';
  console.log(`${socket.username} just connected`);
  socket.on('sos', (data) => {
    io.sockets.emit('reply', { message: 'help is on the way' });
    io.sockets.emit('response', { data });
  });
});

server.listen(PORT);

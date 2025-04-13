const io = require('socket.io')(3001, { cors: { origin: '*' } });
let players = 0;
io.on('connection', socket => {
  players++;
  if (players === 2) {
    io.emit('start');
  }
  socket.on('attack', () => {
    socket.broadcast.emit('attack');
  });
  socket.on('disconnect', () => {
    players--;
  });
});
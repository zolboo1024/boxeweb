const router = require('express').Router();
const socketio = require('socket.io');
//let Space = require('../models/space.model');
//We are setting up the io variable which will create a socket on the port
//5000 for each of the new user.
const io = socketio(5000);
io.on("connection", socket => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
  socket.emit('chat-message', 'Hello-world!');
});

router.route('/:id').get((req, res) => {});

module.exports = router;

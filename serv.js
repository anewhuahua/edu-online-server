var path = require('path');
var express = require('express');
var app = express(); 
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
    
  socket.on('join', function(room){
    console.log("join "+ room);
    socket.join(room); 
  }); 
  socket.on('leave', function(room){
    console.log("leave "+ room);
    socket.leave(room);
  });
  
  socket.on('chat', function(d) {
    data = JSON.parse(d);
    console.log("from " + data.from + " to " + data.to + " " + data.message);
    var msg = {
      from: data.from,
      to: data.to,
      message: data.message
    };
    io.sockets.in(data.to).emit('chat', JSON.stringify(msg));
  });

  /*
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  */
});

app.use(express.static(path.join(__dirname, 'web')));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

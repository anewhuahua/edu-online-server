$(document).ready(function() {

  var socket = null;
  var currentUser = null;
  var currentUserNick = null;

  //reset();

  socket = io();
     
  function reset() {
    if(socket) {
      socket.close();
    }
    socket = null;
    $("#onlineUsers").html("");
    $("#talkFrame").html("");
    $("#nickInput").val("");
  }


   
  function close() {

  }
  

  socket.on('chat', function(msg){
    var data = JSON.parse(msg);
    $("#talkFrame").append("<div>" + data.message + "</div>");
  });

   
  $("#open").click(function(event) {
    currentUserNick = $.trim($("#nickInput").val());
    if('' == currentUserNick) {
      alert('请先输入昵称');
      return;
    }

    socket.emit("join", currentUserNick);


    $("#prePage").hide();
    $("#mainPage").show();
    //reset();

  });


  $("#send").click(function(event) {
    var value = $.trim($("#message").val());
    var data ={
      from: currentUserNick,
      to: "tyson",
      message: value
    };
    socket.emit("chat", JSON.stringify(data));
    $("#message").val('');
    
  });


});


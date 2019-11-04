$(function () {
    var username = prompt("请输入用户名") || "匿名用户" + 10000 + Math.floor(Math.random() * 10000)
    var socket = io();
    $('form').submit(function () {
        var msg = {name: username, msg: $('#m').val()};
        // 把组装的消息以json的形式给客户端
        socket.emit('chat message', JSON.stringify(msg));
        $('#messages').append($('<li>').text("我说:" + $('#m').val()));
        $('#m').val('');
        return false;
    });
    socket.on('clientBroadCast', function (msg) {
        console.log(msg);
        // 一定要分清,parse用于从一个字符串中解析出json对象,stringify()用于从一个对象解析出字符串
        var msgJSON = JSON.parse(msg);
        // 将消息填入
        $('#messages').append($('<li>').text(msgJSON.name + "说:" + msgJSON.msg));
    });
});

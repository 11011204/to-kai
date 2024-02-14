var http = require('http');
var clientHtml = require('fs').readFileSync('client.html');

var plainHttpServer = http.createServer(function (request, response) {
 response.writeHead(200, { 'Content-Type': 'text/html' });
 response.end(clientHtml);
}).listen(8080);

var planHttpServer=htt.createServer(function(request,response){
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end(clientHtml);
}).listen(8080);

var files=require('fs');

//var io = require('socket.io').listen(plainHttpServer);  	// socket.io@2.xのみ
io.origins = ['localhost:8080', '192.168.0.221:8080'];        // socket.io@2.x以降

io.sockets.on('connection', (socket) => {

  //イベント(req_button_1)の待機と受信
  socket.on('req_button_1', (from) => {
　　console.log(from + 'からreq_button_1を受信しました。');

    // ファイル（switch_1.txt）に書き込み
　　files.writeFileSync('switch_1.txt', from);

    // ファイル（switch_1.txt）から読み込み
    var switch_1_data = files.readFileSync('switch_1.txt', {encoding: "utf-8"});
　　console.log(switch_1_data);

    // イベント（res_button_1）の発信
socket.emit('res_button_1', switch_1_data);
});
});



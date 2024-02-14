var http=require('http');
var clientHtml=require('fs').readFileSync('client.html');

var plainHttpServer=http.createServer(function(request,response){
  response.writeHead(200,{'Content-Type':'text/html'});
  response.end(clientHtml);
}).listen(8080);

//var io=require('socket.io').listen(planHttpServer);   //socket.io@2.xのみ
var io=require('socket.io')(plainHttpServer);      //socket.io@2.x3以降

//io.set('origins', ['localhost:8080', '192.168.11.42:8080']);  //socket.io@2.xのみ
io.origins=['locallhost:8080','192.168.11.42:8080'];    //socket.io@2.x以降

//io.sockets.on('connection',function(socket){  //アロー関数へ変更前
io.socket.on('connection',(socket)=>{    //アロー関数へ変更後
             socket.on('req_button_1',function(from){
               console.log(from+'からreq_button_1を受信しました。');
             });
});

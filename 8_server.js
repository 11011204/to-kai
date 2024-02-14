///////////////////////////////////////////////////////////////////////
// httpサーバの立ち上げ　plainHttpServer(httpサーバとSocket.ioを連携)
var http = require('http');
var fs   = require('fs');
var path = require('path');
var mime = {
".html": "text/html",
  ".css":  "text/css"
  // 読み取りたいMIMEタイプはここに追記
};
var plainHttpServer = new http.createServer(function(req, res) {
  if (req.url == '/') { filePath = '/client.html'; }
  else { filePath = req.url; }
  var fullPath = __dirname + filePath;
  res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
  fs.readFile(fullPath, function(err, data) {
    if (err) { } // エラー時の応答
    else { res.end(data, 'UTF-8'); }
  });
}).listen(8080);
console.log('Server running at http://localhost:8080/');


//////////////////////////////////////////////////
// Socket.ioの組み込みと設定
// plainHttpServer(httpサーバとSocket.ioを連携)
var files = require('fs');
//var io = require('socket.io').listen(plainHttpServer);    	// socket.io@2.x
var io = require('socket.io')(plainHttpServer);           	// socket.io@2.x以降
//io.set('origins', ['localhost:8080', '192.168.0.221:8080']);  // socket.io@2.x
io.origins = ['localhost:8080', '192.168.11.42:8080'];    //sockt.io2.x以降

//////////////////////////////////////////////////
// クライアント（ブラウザ）とサーバが接続を完了した時
//io.sockets.on('connection', function (socket) {  	 // アロー関数へ変更前
io.sockets.on('connection', (socket) => {           // アロー関数へ変更後
  console.log('socket.ioをconnectionしました。');
  
  /////////////////////////////////////////////////////////////////
  // (接続直後のイベント発信)
  //　ファイル（switch_1.txt）からデータ（ON あるいはOFF）の読み込み
  // イベント（read_switch_1_data)の発信
  var switch_1_data = files.readFileSync('./data/switch_1.txt', {encoding: "utf-8"});
  console.log(switch_1_data);
socket.emit('read_switch_1_data', switch_1_data);
  // ファイル（result_1.txt）からデータ（測定値）の読み込み
  // イベント（read_result_1data)の発信
  var result_1_data = files.readFileSync('./results/result_1.txt', {encoding: "utf-8"});
  console.log(result_1_data);
  socket.emit('read_result_1_data', result_1_data)
  
  /////////////////////////////////////////////////////////////////
  // （定期的なイベント発信）　3000ms間隔で発信
  setInterval(function(){
    // ファイル（switch_1.txt）からデータ（ON あるいはOFF）の読み込み
    // イベント（read_switch_1_data)の発信
    switch_1_data = files.readFileSync('./data/switch_1.txt', {encoding: "utf-8"});
    console.log(switch_1_data);
    socket.emit('read_switch_1_data', switch_1_data)
    // ファイル（result_1.txt）からデータ（測定値）の読み込み
    // イベント（read_result_1data)の発信
    result_1_data = files.readFileSync('./results/result_1.txt', {encoding: "utf-8"});
    console.log(result_1_data);
    socket.emit('read_result_1_data', result_1_data)
  }, 3000);
  
  //////////////////////////////////////////
// イベント（req_button_1）の待機と受信
socket.on('req_button_1', function (from) {
console.log(from + 'からreq_button_1を受信しました。');
// ファイル（switch_1.txt）からデータ（ON あるいはOFF）の読み込み
var switch_1_data = files.readFileSync('./data/switch_1.txt', {encoding: "utf-8"});
console.log(switch_1_data);
// switch_1.txtのデータを切り替える ON ⇔ OFF
var re_switch_1_data;
if(switch_1_data == 'ON') {	re_switch_1_data = 'OFF';	}
else if (switch_1_data == 'OFF') { re_switch_1_data = 'ON';	}
else { console.log('エラー switch_1.txtのデータはON,OFF以外'); }
// ファイル（switch_1.txt）に書き込み
files.writeFileSync('./data/switch_1.txt', re_switch_1_data);
console.log('switch_1.txt'+ switch_1_data + '⇒' + re_switch_1_data);
// イベント（res_button_1）の発信
socket.emit('res_button_1', switch_1_data, re_switch_1_data);
});

});

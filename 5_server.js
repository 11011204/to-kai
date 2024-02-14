var http = require('http');
var fs   = require('fs');
var path = require('path');
var mime = {
  ".html": "text/html",
  ".css":  "text/css"
  // 読み取りたいMIMEタイプはここに追記
};

var plainHttpServer = new http.createServer(function(req, res) {

  if (req.url == '/') {
    filePath = '/client.html';
  } else {
    filePath = req.url;
  }
  var fullPath = __dirname + filePath;

  res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
  fs.readFile(fullPath, function(err, data) {
    if (err) {
      // エラー時の応答
    } else {
      res.end(data, 'UTF-8');
    }
  });
}).listen(8080);
console.log('Server running at http://localhost:8080/');

var files = require('fs');

//var io = require('socket.io').listen(plainHttpServer);    // socket.io@2.x
var io = require('socket.io')(plainHttpServer);           // socket.io@2.x以降
//io.set('origins', ['localhost:8080', '192.168.0.221:8080']);  // socket.io@2.x
io.origins = ['localhost:8080', '192.168.0.221:8080'];          // socket.io@2.x以降

//クライアント（ブラウザ）とサーバが接続を完了した時の処理
io.sockets.on('connection', function (socket) {
  console.log('socket.ioをconnectionしました。');
  
  //////////////////////////////////////////////////////////////////////
  // ファイル（switch_1.txt）からデータ（ON あるいはOFF）の読み込み　button_1クリック前
  var switch_1_data = files.readFileSync('switch_1.txt', {encoding: "utf-8"});
  console.log(switch_1_data);
  // イベント（'read_switch_1_data'）の発信
socket.emit('read_switch_1_data', switch_1_data);
  
  //////////////////////////////////////////////////
// イベント（req_button_1）の待機と受信 button_1クリック後
socket.on('req_button_1', (from) => {
console.log(from + 'からreq_button_1を受信しました。');
// ファイル（switch_1.txt）からデータ（ON あるいはOFF）の読み込み
var switch_1_data = files.readFileSync('switch_1.txt', {encoding: "utf-8"});
console.log(switch_1_data);
// switch_1.txtのデータを切り替える ON ⇔ OFF
var re_switch_1_data;
if(switch_1_data == 'ON') {	re_switch_1_data = 'OFF';	}
else if (switch_1_data == 'OFF') { re_switch_1_data = 'ON';	}
else { console.log('エラー switch_1.txtのデータはON,OFF以外'); }
// ファイル（switch_1.txt）に書き込み
files.writeFileSync('switch_1.txt', re_switch_1_data);
console.log('switch_1.txt'+ switch_1_data + '⇒' + re_switch_1_data);
// イベント（res_button_1）の発信
socket.emit('res_button_1', switch_1_data, re_switch_1_data);
});

});

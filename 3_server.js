var http = require('http');
： 
io.sockets.on('connection', (socket) => {
//socket.emit('hello', 'socket.io！');

// イベント（req_button_1）の待機と受信
socket.on('req_button_1', function (from) {
 console.log(from + 'からreq_button_1を受信しました。');

 // ファイル（switch_1.txt）からデータ（ON あるいはOFF）の読み込み
var switch_1_data = files.readFileSync('switch_1.txt', {encoding: "utf-8"});
console.log(switch_1_data);
    
// switch_1.txtのデータを切り替える ON ⇔ OFF
var re_switch_1_data; 
if(switch_1_data == 'ON') {
 re_switch_1_data = 'OFF';
} else if (switch_1_data == 'OFF') {
 re_switch_1_data = 'ON';
} else {
 console.log('エラー switch_1.txtのデータはON,OFF以外');
}
// ファイル（switch_1.txt）に書き込み
files.writeFileSync('switch_1.txt', re_switch_1_data);
console.log('switch_1.txt'+ switch_1_data + '⇒' + re_switch_1_data);

// イベント（res_button_1）の発信
socket.emit('res_button_1', switch_1_data, re_switch_1_data);
});
});

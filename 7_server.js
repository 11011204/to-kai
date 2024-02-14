/////////////////////////////////////////////////////////////////
  // (接続直後のイベント発信)
  //　ファイル（switch_1.txt）からデータ（ON あるいはOFF）の読み込み
  // イベント（read_switch_1_data)の発信
  var switch_1_data = files.readFileSync('./data/switch_1.txt', {encoding: "utf-8"});
　
　　　　　　　　　　：
　
  /////////////////////////////////////////////////////////////////
  // （定期的なイベント発信）　3000ms間隔で発信
  // ファイル（switch_1.txt）からデータ（ON あるいはOFF）の読み込み
  // イベント（read_switch_1_data)の発信
  setInterval(function(){
    switch_1_data = files.readFileSync('./data/switch_1.txt ', {encoding: "utf-8"});
　
　　　　　　　　　　：

//////////////////////////////////////////////////
// イベント（req_button_1）の待機と受信 button_1クリック後
socket.on('req_button_1', function (from) {
console.log(from + 'からreq_button_1を受信しました。');
// ファイル（switch_1.txt）からデータ（ON あるいはOFF）の読み込み
var switch_1_data = files.readFileSync('./data/switch_1.txt ', {encoding: "utf-8"});

　　　　　　　　　　：

// ファイル（switch_1.txt）に書き込み
files.writeFileSync('./data/switch_1.txt ', re_switch_1_data);

　　　　　　　　　　：


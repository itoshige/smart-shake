var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var ds = milkcocoa.dataStore('countdata');

var count = 0;
var countbox = document.getElementById('count');
var nameform = document.getElementById('nameform');


initialize();

function furu(e) {
	var x = e.accelerationIncludingGravity.x; // X方向の加速度
	var y = e.accelerationIncludingGravity.y; // Y方向の加速度
	var z = e.accelerationIncludingGravity.z; // Z方向の加速度

	// 加速度が一定以上のとき
	if (Math.abs(x) > 200 || Math.abs(y) > 200 || Math.abs(z) > 60) {
	// ここに振っているときの動作を入れる
		alert(Math.abs(x) + " : " + Math.abs(y) + " : " + Math.abs(z));
//		count++;
//		countbox.innerHTML = 'count: '+ count;
//		data ={};
//		data.name = name;
//		data.count = count;
//		ds.send({data: data});
	}
}

function initialize() {
	window.addEventListener('devicemotion', function (e) {
		return furu(e);
	}, true);
}	

function namefunc(){
	name = document.nameform.nameval.value;
	nameform.innerHTML = "your name " + name;
	//shakecheck(name);
} 

function submitStop(e){
	if (!e) var e = window.event;

	if(e.keyCode == 13)
		return false;
}


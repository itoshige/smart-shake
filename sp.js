var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var ds = milkcocoa.dataStore('countdata');

var count = 0;
var countbox = document.getElementById('count');
var nameform = document.getElementById('nameform');


function furu(e) {
		alert("test");
	var x = e.accelerationIncludingGravity.x; // X�����̉����x
	var y = e.accelerationIncludingGravity.y; // Y�����̉����x
	var z = e.accelerationIncludingGravity.z; // Z�����̉����x

	// �����x�����ȏ�̂Ƃ�
	if (Math.abs(x) > 15 || Math.abs(y) > 15 || Math.abs(z) > 15) {
	// �����ɐU���Ă���Ƃ��̓��������
		alert("�U���Ă��");
		count++;
		countbox.innerHTML = 'count: '+ count;
		data ={};
		data.name = name;
		data.count = count;
		ds.send({data: data});
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


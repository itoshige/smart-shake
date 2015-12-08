var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var users = milkcocoa.dataStore('shake/users');

var countbox = document.getElementById('count');
var loginform = document.getElementById('context');
var error = document.getElementById('error');

var game = milkcocoa.dataStore('shake/game');


var id = (window.localStorage.getItem('id')) ? window.localStorage.getItem('id') : getRandomID();
window.localStorage.setItem('id', id);
var count = 0;
var name = "";
users.get(id, function(err, datum) {
	if(err) return;
	
	var uname = datum.value.name;
	if(!uname) return;
	
	name = uname;
	count = datum.value.count;
	entryGame(uname);
});


var shake = function(name) {
  $(this).gShake(function() {
    count++;
    countbox.innerHTML = count + ' shake!';
    displayPC(name, count);
  });
}

function displayPC(name, count) {
	users.set(id, {'name': name, 'count': count});
}

function entry() {
	name = document.getElementById('inputName').value;
	entryGame(name);
}

function entryGame(name){
	users.stream().next(function(err, data) {
		for(var i=0; i<data.length; i++) {
		    var uname = data[i].value.name;
		    var uid = data[i].id;
		    if(uname === name && uid !== id) {
		    	error.innerHTML = "Team name you entered is already in use. Please enter another team name. ";
		    	return;
		    }
		}
		
		loginform.innerHTML = "<h5>Your name : " + name + "</h5>";

		game.get('start', function(err, datum) {
			countbox.innerHTML = 'Waiting for start.';
			if(err) return;
			
			game.on('set', startgame);
			
			startgame(datum);
		});
	});
}

function startgame(set) {
	displaySP(set.value.flag);
	displayPC(name, count);
}

function displaySP(start) {
	if(start) {
		countbox.innerHTML = count + ' shake!';
		shake(name);
	} else {
		countbox.innerHTML = 'Waiting for start.';
	}
}

//���s��submit�����Ȃ��悤�ɂ���
function submitStop(e){
    if (!e) var e = window.event;

    if(e.keyCode == 13)
        return false;
}



// 1�������s�b�N�A�b�v������@
function method2() {
  var l = 10; // �������镶����̒���
  var c = "abcdefghijklmnopqrstuvwxyz0123456789"; // �������镶����Ɋ܂߂镶���Z�b�g
  var cl = c.length;
  var r = "";
  for (var i = 0; i < l; i++) {
    r += c[Math.floor(Math.random() * cl)];
  }
  return r;
}

// ���ʂ�1�������s�b�N�A�b�v������@�����s
function getRandomID() {
  return method2();
}

var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var users = milkcocoa.dataStore('shake/users');

var countbox = document.getElementById('count');
var loginform = document.getElementById('context');
var errors = document.getElementById('error');

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
	entryGame();
});


var shake = function(name) {
	game.get('start', function(err, datum) {
		
		$(this).gShake(function() {
			if(!datum.value.flag || err != null) {
				countbox.innerHTML = 'Waiting for start.';
				count = 0;
				return;
			}
			
			count++;
			countbox.innerHTML = count + ' shake!';
			updateUser(name, count);	
		});
	});
}

function updateUser(name, count) {
	users.set(id, {'name': name, 'count': count});
}

function entry() {
	name = document.getElementById('inputName').value;
	entryGame();
}

function entryGame(){
	if(!name) {
		errors.innerHTML = "Please input your team name.";
		return;
	}

	users.stream().next(function(err, data) {
		for(var i=0; i<data.length; i++) {
		    if(data[i].value.name === name && data[i].id !== id) {
		    	errors.innerHTML = "Team name you entered is already in use. Please enter another team name. ";
		    	return;
		    }
		}
		
		loginform.innerHTML = "<h5>Your name : " + name + "</h5>";

		game.get('start', function(err, datum) {
			countbox.innerHTML = 'Waiting for start.';
			if(err) return;
			
			game.on('set', startgame);
			
			updateUser(name, count);
			startgame(datum);
		});
	});
}

function startgame(set) {
	displaySP(set.value.flag, name);
}

function displaySP(start, name) {
	if(!start) {
		countbox.innerHTML = 'Waiting for start.';
		return;
	}
	countbox.innerHTML = count + ' shake!';
	shake(name);
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

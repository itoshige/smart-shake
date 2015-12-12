var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var users = milkcocoa.dataStore('shake/users');

var countbox = document.getElementById('count');
var loginform = document.getElementById('context');
var errors = document.getElementById('error');

var game = milkcocoa.dataStore('shake/game');

var id = (window.localStorage.getItem('id')) ? window.localStorage.getItem('id') : getRandomID();
window.localStorage.setItem('id', id);

var name = "";
var count = 0;
var order = 0;

users.get(id, function(err, datum) {
	if(err) return;
	
	var uname = datum.value.name;
	if(!uname) return;
	
	name = uname;
	count = datum.value.count;
	order = datum.value.order;
	entryGame();
});


var shake = function(name) {
	$(this).gShake(function() {
		users.get(id, function(err, datum) {
			if(err) {
				window.location.reload();
				return;
			}
			count = datum.value.count;
			order = datum.value.order;
			
			game.get('start', function(err, datum) {
				if(!datum.value.flag) {
					countbox.innerHTML = 'Waiting for start.';
					count = 0;
					order = 0;
					return;
				} else {
					if(count >= 30) {
						count=0;
						game.get('order', function(err, datum) {
							order = 1;
							if(datum) order += datum.value.number;
							game.set('order', {'number': order});
						});
					}
					count++;
					countbox.innerHTML = count + ' shake!';
					updateUser(name, count, order);
				}
			});
		});
	});
}

function updateUser(name, count, order) {
	users.set(id, {'name': name, 'count': count, 'order': order});
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
	
	if(name.length > 10) {
		errors.innerHTML = "Please enter your name in 10 characters or less.";
		return;
	}
	
	users.stream().next(function(err, data) {
		for(var i=0; i<data.length; i++) {
		    if(data[i].value.name === name && data[i].id !== id) {
		    	errors.innerHTML = "Team name you entered is already in use. Please enter another team name. ";
		    	return;
		    }
		}
		
		loginform.innerHTML = "<h5>" + name + "</h5>";

		game.get('start', function(err, datum) {
			countbox.innerHTML = 'Waiting for start.';
			if(err) return;
			
			game.on('set', startgame);
			
			updateUser(name, count, order);
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

//改行でsubmitさせないようにする
function submitStop(e){
    if (!e) var e = window.event;

    if(e.keyCode == 13)
        return false;
}

// 1文字ずつピックアップする方法
function method2() {
  var l = 10; // 生成する文字列の長さ
  var c = "abcdefghijklmnopqrstuvwxyz0123456789"; // 生成する文字列に含める文字セット
  var cl = c.length;
  var r = "";
  for (var i = 0; i < l; i++) {
    r += c[Math.floor(Math.random() * cl)];
  }
  return r;
}

// 普通に1文字ずつピックアップする方法を実行
function getRandomID() {
  return method2();
}

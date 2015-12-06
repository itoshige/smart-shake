var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var users = milkcocoa.dataStore('shake/users');

var storageCount = window.localStorage.getItem('count');
var count = (storageCount) ? storageCount : 0;
var countbox = document.getElementById('count');
var loginform = document.getElementById('context');

var error = document.getElementById('error');

var game = milkcocoa.dataStore('shake/game');
game.on('send', function(sent) {
	if(sent.value.clear) {
		window.localStorage.removeItem('username');
		window.localStorage.removeItem('count');
		window.location.reload();
	}
});

var isStarted = false;

var storageName = window.localStorage.getItem('username');
var name = (storageName) ? storageName : "";
if(name) entryGame(name);

window.alert = function() {};

var shake = function(name) {
  $(this).gShake(function() {
  	if(!isStarted) return;
  	
    count++;
    countbox.innerHTML = count + ' shake!';
    window.localStorage.setItem("count", count);
    displayPC(name, count);
  });
}

function displayPC(name, count) {
	users.set(name, {'count': count});
}

function entry() {
	name = document.getElementById('inputName').value;
	entryGame(name);
}

function entryGame(name){
	users.stream().next(function(err, data) {
		for(var i=0; i<data.length; i++) {
		    var uname = data[i].id;
		    if(uname === name) {
		    	error.innerHTML = "User name you entered is already in use. Please enter another user name. ";
		    	return;
		    }
		}
		
		loginform.innerHTML = "<h5>Your name : " + name + "</h5>";

		game.get('start', function(err, datum) {
			countbox.innerHTML = 'Waiting for start.';
			if(err) return;
			
			game.on('set', startgame);
			
			displaySP(datum.value.flag);
		});
		
		window.localStorage.setItem("username", name);
	});
}

function startgame(set) {
	displaySP(set.value.flag);
}

function displaySP(start) {
	if(start) {
		countbox.innerHTML = count + ' shake!';
		shake(name);
		isStarted = true;
	} else {
		countbox.innerHTML = 'Waiting for start.';
		count = 0;
		displayPC(name, 0);
		isStarted = false;
	}
}

//â¸çsÇ≈submitÇ≥ÇπÇ»Ç¢ÇÊÇ§Ç…Ç∑ÇÈ
function submitStop(e){
    if (!e) var e = window.event;

    if(e.keyCode == 13)
        return false;
}
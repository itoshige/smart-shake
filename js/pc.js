var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var users = milkcocoa.dataStore('shake/users');
users.on('set', display4userset);

var countbox = document.getElementById('count');

var game = milkcocoa.dataStore('shake/game');

var context = document.getElementById('context');
game.get('start', function(err, datum) {
	context.innerHTML = "Waiting for start.";
	if(err) return;
	
	if(datum.value.flag) {
		context.innerHTML = "Game start!";
	}
});

var display = function(id, name, count){
	var existedDiv = document.getElementById(id);
	if(existedDiv) {
		existedDiv.innerHTML = "name: " + name + "  count : " + count;
		return;
	}
	
	var newelement = document.createElement('div');
	newelement.id = id; 
	newelement.innerHTML = "name: " + name + "  count : " + count;
	countbox.appendChild(newelement); 
}

exec4users(display);

function startGame() {
	context.innerHTML = "Game start!";
	game.set('start', {'flag': true});
}

function resetGame() {
	context.innerHTML = "Waiting for start.";
	game.set('start', {'flag': false});
	
	var resetCount = function(id, name) {
		document.getElementById(id).innerHTML = "name: " + name + "  count : " + 0;
	}
	exec4users(resetCount);
}

function clearData() {
	context.innerHTML = "Waiting for start.";
	countbox.innerHTML = "";
	game.set('start', {'flag': false});
	
	var removeUsers = function(id) {
		users.remove(id);
	}
	exec4users(removeUsers);
}

function exec4users(func) {
	users.stream().next(function(err, data) {
		for(var i=0; i<data.length; i++) {
		    func(data[i].id, data[i].value.name, data[i].value.count);
		}
	});
}

function display4userset(sent) {
	display(id, name, count);
}

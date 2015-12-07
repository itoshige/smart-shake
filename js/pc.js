var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var users = milkcocoa.dataStore('shake/users');
users.on('set', countview);

var countbox = document.getElementById('count');

var game = milkcocoa.dataStore('shake/game');

var context = document.getElementById('context');
game.get('type', function(err, datum) {
	context.innerHTML = "Waiting for start.";
	if(err) return;
	
	if(datum[0].id === 'start') {
		context.innerHTML = "Game start!";
	}
});

function startGame() {
	context.innerHTML = "Game start!";
	game.set('start', {'flag': true});
}

function stopGame() {
	context.innerHTML = "Game stop!";
	game.set('start', {'flag': true});
}

function resetGame() {
	context.innerHTML = "Waiting for start.";
	game.set('start', {'flag': false});
}

function clearData() {
	context.innerHTML = "Waiting for start.";
	countbox.innerHTML = "";
	game.set('start', {'flag': false});
	game.send({'clear': true});
	
	users.stream().next(function(err, data) {
		for(var i=0; i<data.length; i++) {
		    var uname = data[i].id;
		    users.remove(uname);
		}
	});
}

function countview(sent){
	if(sent.value.count >= 1){
		var oldelement = document.getElementById(sent.id);
		if(null != oldelement && null != oldelement.parentNode)
			oldelement.parentNode.removeChild(oldelement);
	}

	var newelement = document.createElement('div');
	newelement.id = sent.id; 
	newelement.innerHTML = "name: " + sent.id + "  count : " + sent.value.count;
	countbox.appendChild(newelement); 
}
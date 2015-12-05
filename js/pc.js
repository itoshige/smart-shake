var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var user = milkcocoa.dataStore('shake/user');
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

user.on('send', countview);

function startGame() {
	context.innerHTML = "Game start!";
	game.set('start', {'flag': true});
}

function resetGame() {
	game.set('start', {'flag': false});
}

function clearData() {
	game.send({'clear': true});
}

function countview(sent){
	if(sent.value.data.count >= 2){
		var oldelement = document.getElementById(sent.value.data.name);
		if(null != oldelement && null != oldelement.parentNode)
			oldelement.parentNode.removeChild(oldelement);
	}

	var newelement = document.createElement('div');
	newelement.id = sent.value.data.name; 
	newelement.innerHTML = "name: " + sent.value.data.name + "  count : " + sent.value.data.count;
	countbox.appendChild(newelement); 
}
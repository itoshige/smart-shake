var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var users = milkcocoa.dataStore('shake/users');
users.on('set', countview);

var countbox = document.getElementById('count');

var game = milkcocoa.dataStore('shake/game');

var context = document.getElementById('context');
game.get('start', function(err, datum) {
	context.innerHTML = "Waiting for start.";
	if(err) return;
	
	if(datum.value.flag) 
		context.innerHTML = "Game start!";
});

function startGame() {
	context.innerHTML = "Game start!";
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
	
	users.stream().next(function(err, data) {
		for(var i=0; i<data.length; i++) {
		    users.remove(data[i].id);
		}
	});
}

function countview(sent){
	var existedId = document.getElementById(sent.id);
	
	if(existedId) {
		existedId.innerHTML = "name: " + sent.value.name + "  count : " + sent.value.count;
		return;
	}

//	if(sent.value.count >= 1){
//		var oldelement = document.getElementById(sent.id);
//		if(null != oldelement && null != oldelement.parentNode)
//			oldelement.parentNode.removeChild(oldelement);
//	}

	var newelement = document.createElement('div');
	newelement.id = sent.id; 
	newelement.innerHTML = "name: " + sent.value.name + "  count : " + sent.value.count;
	countbox.appendChild(newelement); 
}
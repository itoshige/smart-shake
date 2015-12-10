var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var users = milkcocoa.dataStore('shake/users');
users.on('set', display4userset);

var game = milkcocoa.dataStore('shake/game');

var countbox = document.getElementById('count');

var max = 30;

game.get('start', function(err, datum) {
	display4wait();
	if(err) return;
	
	if(datum.value.flag) {
		display4start();
	}
});

var display = function(id, name, count){
	var existedTrElem = document.getElementById(id);
	if(count >= 30) {
		count = 0;
		existedAnsElem = document.getElementById('answer-' + id);
		existedAnsElem.innerHTML = '<span class="badge">1</span>';
	}
	
	if(existedTrElem) {
		var existedProgress = document.getElementById('progress-' + id);
		existedProgress.innerHTML = '<div class="progress-bar" style="width: ' + count/max * 100 + '%;">' + count + '</div>';
		return;
	}
	
	var trElem = document.createElement('tr');
	trElem.id = id;
	
	var nameElem = document.createElement('td');
	nameElem.id = 'name-' + id;
	nameElem.innerHTML = name;
	
	var progressElem = document.createElement('td');
	var progressDiv = document.createElement('div');
	progressDiv.className = "progress";
	progressDiv.id = "progress-" + id;
	progressDiv.innerHTML = '<div class="progress-bar" style="width: ' + count/max * 100 + '%;">' + count + '</div>';
	progressElem.appendChild(progressDiv);
	
	var answerElem = document.createElement('td');
	answerElem.id = 'answer-' + id;
	
	trElem.appendChild(nameElem);
	trElem.appendChild(progressElem);
	trElem.appendChild(answerElem);
	countbox.appendChild(trElem); 
}


exec4users(display);

function startGame() {
	disable4start();
	display4start();
	game.set('start', {'flag': true});
}

function resetGame() {
	disable4reset();
	display4wait();
	game.set('start', {'flag': false});
	
	var resetCount = function(id, name) {
		var existedProgress = document.getElementById('progress-' + id);
		existedProgress.innerHTML = '<div class="progress-bar" style="width: ' + 0 + '%;">0</div>';
	}
	exec4users(resetCount);
}

function clearData() {
	disable4reset();
	display4wait();
	countbox.innerHTML = "";
	game.set('start', {'flag': false});
	
	var removeUsers = function(id) {
		users.remove(id);
	}
	exec4users(removeUsers);
}

var startBtn = document.getElementById('startBtn');
var resetBtn = document.getElementById('resetBtn');
var clearBtn = document.getElementById('clearBtn');
disable4reset();

function disable4reset() {
	startBtn.className = "dropdown active";
	resetBtn.className = "disabled";
	clearBtn.className = "disabled";
}
function disable4start() {
	startBtn.className = "disabled";
	resetBtn.className = "dropdown active";
	clearBtn.className = "dropdown active";
}

var context = document.getElementById('context');
function display4wait() {
	context.innerHTML = "Waiting for start.";
	context.className = "alert alert-dismissible alert-warning";
}

function display4start() {
	context.innerHTML = "Game start!";
	context.className = "alert alert-dismissible alert-success";
}

function exec4users(func) {
	users.stream().next(function(err, data) {
		for(var i=0; i<data.length; i++) {
		    func(data[i].id, data[i].value.name, data[i].value.count);
		}
	});
}

function display4userset(sent) {
	display(sent.id, sent.value.name, sent.value.count);
}
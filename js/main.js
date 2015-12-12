var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var users = milkcocoa.dataStore('shake/users');
users.on('set', display4userset);

var game = milkcocoa.dataStore('shake/game');

var countbox = document.getElementById('count');

var max = 20;

game.get('start', function(err, datum) {
	display4wait();
	disable4reset();
	if(err) return;
	
	if(datum.value.flag) {
		display4start();
		disable4start();
	}
});

var display = function(id, name, count, order){
	var existedTrElem = document.getElementById(id);
	if(existedTrElem && count >= max) {
		existedAnsElem = document.getElementById('answer-' + id);
		existedAnsElem.innerHTML = order;
	}
	
	if(existedTrElem) {
		var existedProgress = document.getElementById('progress-' + id);
		existedProgress.innerHTML = '<div class="progress-bar" style="width: ' + count/max * 100 + '%;">' + count + '</div>';
		
		if(order > 0) {
			var existedAnswer = document.getElementById('answer-' + id);
			existedAnswer.innerHTML = order;
		}
		
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
	var answerSpanElem = document.createElement('span');
	answerSpanElem.id = 'answer-' + id;
	answerSpanElem.className = 'badge';
	answerElem.appendChild(answerSpanElem);
	
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
	resetData();
	
	var resetCount = function(id, name, count) {
		var existedProgress = document.getElementById('progress-' + id);
		existedProgress.innerHTML = '<div class="progress-bar" style="width: ' + 0 + '%;">0</div>';
		var existedAnswer = document.getElementById('answer-' + id);
		existedAnswer.innerHTML = "";
		users.set(id, {'name': name, 'count': 0, 'order': 0});
	}
	exec4users(resetCount);
}

function clearData() {
	resetData();
	countbox.innerHTML = "";
	
	var removeUsers = function(id) {
		users.remove(id);
	}
	exec4users(removeUsers);
}

function resetData() {
	disable4reset();
	display4wait();
	game.set('start', {'flag': false});
	game.set('order', {'number': 1});
}

var startBtn = document.getElementById('startBtn');
var resetBtn = document.getElementById('resetBtn');
var clearBtn = document.getElementById('clearBtn');

function disable4reset() {
	startBtn.className = "btn btn-primary";
	resetBtn.className = "btn btn-default disabled";
	clearBtn.className = "btn btn-warning disabled";
}
function disable4start() {
	startBtn.className = "btn btn-primary disabled";
	resetBtn.className = "btn btn-default";
	clearBtn.className = "btn btn-warning";
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
	display(sent.id, sent.value.name, sent.value.count, sent.value.order);
}

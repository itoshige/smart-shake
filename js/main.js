var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var users = milkcocoa.dataStore('shake/users');
users.on('set', display4userset);
var userspoint = milkcocoa.dataStore('shake/userspoint');

var game = milkcocoa.dataStore('shake/game');
var nextorder = milkcocoa.dataStore('shake/nextorder');
var nextpoints = milkcocoa.dataStore('shake/nextpoints');

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

var display = function(id, name, count, order, point){
	var existedTrElem = document.getElementById(id);
	
	if(existedTrElem) {
		var existedProgress = document.getElementById('progress-' + id);
		existedProgress.className = "progress progress-bar";
		existedProgress.style.width = count/max * 100 + '%';
		var link = document.getElementById("a-" + id);
		link.innerHTML = count;
		
		if(count >= max) {
			existedProgress.className = "progress-bar progress-bar-success";
			existedProgress.style.width = '100%';
			
			var link = document.getElementById("a-" + id);
			link.href = "#modal";
			link.innerHTML = order;
			
			link.addEventListener('click', function() {
					var correct = document.getElementById('correct');
					var incorrect = document.getElementById('incorrect');
					var correctfunc = function() {
							var givenPoint = document.getElementById('point-' + id);
							givenPoint.className = "badge";
							
							nextpoints.get('nextpoints', function(err, datum) {
								var getpoint = datum.value.cnt;
									
								userspoint.get(id, function(err, datum) {
									var point = datum.value.point;
									var totalpoint = point + getpoint;
									givenPoint.innerHTML = totalpoint;
									
									var div = document.getElementById('progress-' + id);
									div.className = "progress progress-bar progress-bar-success progress-striped active";
									
									var a = document.getElementById('a-' + id);
									a.innerHTML = "correct!";
									
									if(getpoint >= 0) nextpoints.set('nextpoints', {'cnt': --getpoint});
									
									//updateUser(id, name, count, order, totalpoint);
									userspoint.set(id, {'point': totalpoint});
								});
							});
							removeEvent();
						}
					var incorrectfunc = function() {
							users.set(id, {'name': name, 'count': 0, 'order': 0});
							removeEvent();
						}
					function removeEvent() {
						correct.removeEventListener("click", correctfunc, false);
						incorrect.removeEventListener("click", incorrectfunc, false);
					}
					
					correct.addEventListener('click', correctfunc, false);
					incorrect.addEventListener('click', incorrectfunc, false);
				link.removeEventListener("click", arguments.callee, false);
				}, false);
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
	progressDiv.className = "progress progress-bar";
	progressDiv.id = "progress-" + id;
	progressDiv.style.width = count/max * 100 + '%';
	
	var a = document.createElement('a');
	a.style.color = "white";
	a.id = "a-" + id;
	a.innerHTML = count;
	progressDiv.appendChild(a);
	progressElem.appendChild(progressDiv);

	var pointElem = document.createElement('td');
	var pointSpan = document.createElement('span');
	pointSpan.id = 'point-' + id;
	pointElem.appendChild(pointSpan);
	
	trElem.appendChild(nameElem);
	trElem.appendChild(progressElem);
	trElem.appendChild(pointElem);
	countbox.appendChild(trElem); 

	if(count >= max) {
		progressDiv.className = "progress progress-bar progress-bar-success";
		progressDiv.style.width = '100%';
		
		var link = document.getElementById("a-" + id);
		link.href = "#modal";
		link.innerHTML = order;
		
		link.addEventListener('click', function() {
				var correct = document.getElementById('correct');
				var incorrect = document.getElementById('incorrect');
				
				var correctfunc = function() {
						var givenPoint = document.getElementById('point-' + id);
						givenPoint.className = "badge";
						
						nextpoints.get('nextpoints', function(err, datum) {
							var getpoint = datum.value.cnt;
							
							userspoint.get(id, function(err, datum) {
								var point = datum.value.point;
								var totalpoint = point + getpoint;
								givenPoint.innerHTML = totalpoint;
								
								var div = document.getElementById('progress-' + id);
								div.className = "progress progress-bar progress-bar-success progress-striped active";
								
								var a = document.getElementById('a-' + id);
								a.innerHTML = "correct!";
								
								if(getpoint >= 0) nextpoints.set('nextpoints', {'cnt': --getpoint});
								
								//updateUser(id, name, count, order, totalpoint);
								userspoint.set(id, {'point': totalpoint});
							});
						});
						removeEvent();
					}
				var incorrectfunc = function() {
						users.set(id, {'name': name, 'count': 0, 'order': 0});
						removeEvent();
					}
				function removeEvent() {
					correct.removeEventListener("click", correctfunc, false);
					incorrect.removeEventListener("click", incorrectfunc, false);
				}
				correct.addEventListener('click', correctfunc, false);
				incorrect.addEventListener('click', incorrectfunc, false);
			link.removeEventListener("click", arguments.callee, false);
			}, false);
	}
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
		existedProgress.style.width = '0%';
		var link = document.getElementById("a-" + id);
		link.innerHTML = 0;
		
		userspoint.get(id, function(err, datum) {
			var point = datum.value.point;
			updateUser(id, name, 0, 0, point);
		});
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
	nextorder.set('nextorder', {'cnt': 1});
	nextpoints.set('nextpoints', {'cnt': 3});
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

function updateUser(id, name, count, order, point) {
	users.set(id, {'name': name, 'count': 0, 'order': 0});
	userspoint.set(id, {'point': point});
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
		    func(data[i].id, data[i].value.name, data[i].value.count, data[i].value.order);
		}
	});
}

function display4userset(sent) {
	display(sent.id, sent.value.name, sent.value.count, sent.value.order, sent.value.point);
}

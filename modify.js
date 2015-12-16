var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var userspoint = milkcocoa.dataStore('shake/userspoint')
var users = milkcocoa.dataStore('shake/users');

var nextpoints = milkcocoa.dataStore('shake/nextpoints');

var id1= 'zat1ehr1lj';
var id2= '';
var id3= '';
var id4= '';
var id5= '';

/// 1
function setPoint1() {
	var val = document.getElementById('point1').value;
	setPoint(id1, val);
}
function resetCount1() {
	resetCount(id1);
}

/// 2
function setPoint2() {
	var val = document.getElementById('point2').value;
	setPoint(id2, val);
}
function resetCount2() {
	resetCount(id2);
}

/// 3
function setPoint3() {
	var val = document.getElementById('point3').value;
	setPoint(id3, val);
}
function resetCount3() {
	resetCount(id3);
}

/// 4
function setPoint4() {
	var val = document.getElementById('point4').value;
	setPoint(id4, val);
}
function resetCount4() {
	resetCount(id4);
}

/// 5
function setPoint5() {
	var val = document.getElementById('point5').value;
	setPoint(id5, val);
}
function resetCount5() {
	resetCount(id5);
}

/// next point
function setNextpoint() {
	var val = document.getElementById('nextpoint').value;
	nextpoints.set('nextpoints', {"cnt": val});
}


//////
function setPoint(id, point) {
	userspoint.set(id, {'point': point, 'modify': true});
}

function resetCount(id) {
	users.set(id, {'name': name, 'count': 0, 'order': 0});
}
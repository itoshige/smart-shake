var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var ds = milkcocoa.dataStore('countdata');
var countbox = document.getElementById('count');

ds.on('send', countview);

function countview(sent){
	alert("test");
	if(sent.value.data.count >= 2){
		var oldelement = document.getElementById(sent.value.data.name);
		oldelement.parentNode.removeChild(oldelement);
	}

	var newelement = document.createElement('div'); 
	newelement.id = sent.value.data.name; 
	newelement.innerHTML = "name: " + sent.value.data.name + "  count : " + sent.value.data.count;
	countbox.appendChild(newelement); 
}
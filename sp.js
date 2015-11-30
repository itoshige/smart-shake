 sp.js

//©•ª‚ÌappID‚ğ“ü—Í
var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var ds = milkcocoa.dataStore('countdata');

var count = 0;
var countbox = document.getElementById('count');
var nameform = document.getElementById('nameform');


var shakecheck = function(name) {
  $(this).gShake(function() {
    count++;
    countbox.innerHTML = 'count: '+ count;
    data ={};
    data.name = name;
    data.count = count;
    ds.send({data: data});
  });
}

function namefunc(){
    name = document.nameform.nameval.value;
    nameform.innerHTML = "your name " + name;
    shakecheck(name);
} 



//‰üs‚Åsubmit‚³‚¹‚È‚¢‚æ‚¤‚É‚·‚é
function submitStop(e){
    if (!e) var e = window.event;

    if(e.keyCode == 13)
        return false;
}


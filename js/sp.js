var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var ds = milkcocoa.dataStore('countdata');

var count = 0;
var countbox = document.getElementById('count');
var loginform = document.getElementById('context');

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
    name = document.getElementById('inputName').value;
    loginform.innerHTML = "your name " + name;
    shakecheck(name);
} 

//â¸çsÇ≈submitÇ≥ÇπÇ»Ç¢ÇÊÇ§Ç…Ç∑ÇÈ
function submitStop(e){
    if (!e) var e = window.event;

    if(e.keyCode == 13)
        return false;
}
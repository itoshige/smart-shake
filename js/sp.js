var milkcocoa = new MilkCocoa('hotihlxqti3.mlkcca.com');
var ds = milkcocoa.dataStore('countdata');

var count = 0;
var countbox = document.getElementById('count');
var loginform = document.getElementById('context');

var shakecheck = function(name) {
  $(this).gShake(function() {
    count++;
    countbox.innerHTML = count + ' shake!';
    data ={};
    data.name = name;
    data.count = count;
    ds.send({data: data});
  });
}

function namefunc(){
    name = document.getElementById('inputName').value;
    loginform.innerHTML = "<h4>" + "" + name + " san</h4>";
    shakecheck(name);
} 

//���s��submit�����Ȃ��悤�ɂ���
function submitStop(e){
    if (!e) var e = window.event;

    if(e.keyCode == 13)
        return false;
}
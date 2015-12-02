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

//â¸çsÇ≈submitÇ≥ÇπÇ»Ç¢ÇÊÇ§Ç…Ç∑ÇÈ
function submitStop(e){
    if (!e) var e = window.event;

    if(e.keyCode == 13)
        return false;
}


var codes = {
  48: 0,
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9
};

var keydownHelper = function (e) {
  e.preventDefault();
  countbox.removeEventListener("input", inputHelper); 

  var val = countbox.value;

  // Delete
  if (e.keyCode === 8 && val.length) {
    countbox.value = val.slice(0, val.length - 1);
    return;
  }

  // If not a number, do nada
  if (typeof codes[e.keyCode] === "undefined") { return; }

  val += codes[e.keyCode];
  countbox.value = val;
};

var inputHelper = function (e) {
  e.preventDefault();
  window.removeEventListener("keydown", keydownHelper);
};

countbox.addEventListener("input", inputHelper);
window.addEventListener("keydown", keydownHelper); 
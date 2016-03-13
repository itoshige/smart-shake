/*-----
初期化
-----*/
$(function(){
    init();
    fontReSize();
    resultReSize();
    $('#btn').click(clickSelect);
    $('#bingoList p').toggle(resultShow,resultHide);
});
$(window).resize(function(){
    fontReSize();
    resultReSize();
});

/*-----
ビンゴの最大数字（ビンゴ用紙によって変更）
-----*/
var maxNum = 75;

/*-----
ビンゴ数字の初期化
-----*/
var bingoNum,pickNum;
function init() {
    if (window.localStorage.getItem("bingoNum")){
        bingoNum = JSON.parse(window.localStorage.getItem("bingoNum")) || new Array();
        pickNum = JSON.parse(window.localStorage.getItem("pickNum")) || new Array();
        var nowTr = $('#summary').empty().append('<tr />').find('tr:last-child');
        for(var i=0;i<maxNum;i++){
            var num = parseInt(i+1);
            if(num%15==0){
                nowTr.append('<td>' + num + '</td>');  
                nowTr = $('#summary').append('<tr />').find('tr:last-child');
            } else {
                nowTr.append('<td>' + num + '</td>');
            }
        }
        for(var i=0,l=pickNum.length;i<l;i++){
            var num = pickNum[i];
            var tdNum = parseInt(num-1);
            $('#summary td').eq(tdNum).addClass('check');
        }
    } else {
        bingoNum = new Array();
        var nowTr = $('#summary').empty().append('<tr />').find('tr:last-child');
        for(var i=0;i<maxNum;i++){
            var num = parseInt(i+1);
            bingoNum[i] = num;
            if(num%15==0){
                nowTr.append('<td>' + num + '</td>');  
                nowTr = $('#summary').append('<tr />').find('tr:last-child');
            } else {
                nowTr.append('<td>' + num + '</td>');
            }
        }
        pickNum = new Array();
    }

}

/*-----
選ぶまで数字をランダムに表示
-----*/
var numTimer;
function randNum() {
    var cnt = 1 + Math.floor( Math.random() * 99 ); 
    $('#bingo p').text(cnt);
}
function randTimer() {
    numTimer = setInterval("randNum()",100);
}
/*-----
数字を配列から選ぶ
-----*/
function numSelect() {
    var len = bingoNum.length - 1;
    var indx = Math.floor( Math.random() * len );
    var selected = bingoNum[indx];
    pickNum.push(selected);
    bingoNum.splice(indx,1);
    dataSave();
    if(len==0){
        $('#btn').unbind('click',clickSelect).removeClass().addClass('off').text('END');
    }
    return selected;
}
/*-----
数字一覧を表示
-----*/
function resultShow() {
    $('#bingoList').stop().animate({top: '30px'});
    $('#bingoList p').text('Close');
}
function resultHide() {
    $('#bingoList').stop().animate({top: '100%'});
    $('#bingoList p').text('View Result');
}
function resultReSize() {
    var ww = getBrowserWidth();
    var hh = getBrowserHeight();
    $('#summary').css({width:(ww-20) + 'px',height:(hh-50) + 'px'});
    var tdW = $('#summary td').width();
    tdW = Math.floor(tdW*0.8);
    $('#summary td').css('font-size',tdW + 'px');
}
/*-----
ボタンクリックで数字選択
-----*/
function clickSelect() {
    if ($('#btn').is(":contains('STOP')")) {
        $('#btn').text('START');
        clearInterval(numTimer);
        var numText = numSelect();     
        $('#bingo p').text(numText);
        var tdNum = parseInt(numText-1);
        $('#summary td').eq(tdNum).addClass('check');
    } else {
        $('#btn').text('STOP');
		randTimer();
    }
}
/*-----
データリセット
-----*/
$('#reset').click(function() {
    dataReset();
    init();
    fontReSize();
    resultReSize();
    $('#btn').unbind('click').bind('click',clickSelect).removeClass().addClass('on').text('START');
    $('#bingo p').text('00');
});
/*-----
localstorageへデータ保存/リセット
-----*/
function dataSave() {
    if(!window.localStorage) return;
    window.localStorage.setItem("bingoNum", JSON.stringify(bingoNum));
    window.localStorage.setItem("pickNum", JSON.stringify(pickNum));
}
function dataReset() {
	if (!window.localStorage) return;
    window.localStorage.clear();
}
/*-----
ブラウザサイズを取得して文字サイズ変更
-----*/
function fontReSize(){
    var ww = getBrowserWidth();
    var hh = getBrowserHeight();
    var fontSize = Math.floor(hh*0.75);
    $('#bingo p').css('font-size',fontSize+'px');
    var fontLeft = Math.floor($('#bingo p').width()/2);
    var fontTop = Math.floor(($('#bingo p').height()*0.88)/2);
    $('#bingo p').css({width:fontLeft*2,height:fontTop*2,marginLeft:-fontLeft,marginTop:-fontTop});
}
function getBrowserWidth() {
    if ( window.innerWidth ) return window.innerWidth;
    else if ( document.documentElement && document.documentElement.clientWidth != 0 ) return document.documentElement.clientWidth;
    else if ( document.body ) return document.body.clientWidth;
    return 0;
}
function getBrowserHeight() {
    if ( window.innerHeight ) return window.innerHeight;
    else if ( document.documentElement && document.documentElement.clientHeight != 0 ) return document.documentElement.clientHeight;
    else if ( document.body ) return document.body.clientHeight;
    return 0;
}
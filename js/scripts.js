$(document).ready(function(){
    gameBoard();
    randomize();
    $('.back').click(card_clicked);
    $('button.reset').click(reset_stats);
});
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var reset1 = null;
var reset2 = null;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
function gameBoard(){
    var imgCounter = 0;
    for(var i = 0; i < 3; i ++){
        var row = $("<div>").addClass("row");
        row.appendTo(".col-xs-9");
        for(var j = 0; j < 6; j++){
            var card = $("<div>").addClass("card col-xs-2");
            var front = $("<div>").addClass("front");
            var img = $("<img>").addClass("" + ++imgCounter + "");
            var back = $("<div>").addClass("back");
            img.appendTo(front);
            front.appendTo(card);
            back.appendTo(card);
            card.appendTo(row);
        }
    }
}
function randomize(){
var imgNames = ['bigBoss','liquidS','masterMiller','metalGear','psychoM','revolverO','sniper_wolf','solid_snake','vulcan_raven', 'bigBoss','liquidS','masterMiller','metalGear','psychoM','revolverO','sniper_wolf','solid_snake','vulcan_raven'];
    for(var i = 1; i <= 18; i++){
        var randomNum = Math.floor(Math.random() * imgNames.length);
        $("." + i + "").attr({src : "images/" + imgNames.splice(randomNum,1) + ".jpg"});   
    }
}
function shake(){
    $(".front").effect( "shake", {times:4}, 500 );
}
function display_stats(){
    console.log('display_stats accessed');
    if(accuracy === 0 && attempts === 0){
        games_played++;
        $('div.attempts > p.value').text(attempts);
        $('div.accuracy > p.value').text(accuracy);
        $('div.games-played > p.value').text(games_played);
    } else {
        accuracy = Math.floor((matches / attempts) * 100);
        $('div.attempts > p.value').text(attempts);
        $('div.accuracy > p.value').html(accuracy + "&#37;");
    }
}
function reset_stats(){
    matches = 0;
    attempts = 0;
    accuracy = 0;
    matches = 0;
    display_stats();
    randomize();
    setTimeout(displayCards, 800);
}
function resetCards(){
    first_card_clicked = null;
    second_card_clicked = null;
    $(reset1).removeClass('hideCard');
    $(reset2).removeClass('hideCard');
    $('.back').click(card_clicked);
}
function displayCards(){
    $('.back').removeClass('hideCard');
    $('.back').effect('shake',{times:4},1000);
    $('.front').effect('shake',{times:4},1000);
}
function winner(){
    var modal = $('<div>').attr({id: 'mgsModal', class:'modal fade modal-lg', style:'margin: auto; top:25%;',role: 'dialog', 'aria-labelledby' : 'myLargeModalLabel' });
    var modalDiag = $('<div>').attr({class : 'modal-dialog modal-lg', role: 'document'});
    var modalCont = $('<div>').attr({class : 'modal-content'});
    var modalHead = $('<div>').attr({class : 'modal-header'}).html("<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h4 class='modal-title' id='modalTitle'>Winner!</h4>");
    var modalBody = $('<div>').attr({class : 'modal-body'}).html("stuff");
    var modalFoot = $('<div>').attr({class : 'modal-footer'}).html("<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>");
    $(modalCont).append(modalHead, modalBody, modalFoot);
    $(modalDiag).append(modalCont);
    $(modal).append(modalDiag);
    $('section').append(modal);
    $('#mgsModal').modal('show');
}
function card_clicked(){
    if(first_card_clicked===null){
        first_card_clicked = $(this).parent().children().children().attr('src');
        $(this).addClass('hideCard');
        reset1 = this;
    } else {
        second_card_clicked = $(this).parent().children().children().attr('src');
        $(this).addClass('hideCard');
        reset2 = this;
        attempts++;
        if(first_card_clicked == second_card_clicked){
            first_card_clicked = null;
            second_card_clicked = null;
            matches++;
            display_stats();
            if(matches == total_possible_matches){
                reset_stats();
                winner();
            } else {
                return
            }
        } else {
            $('.back').off('click');
            setTimeout(resetCards,800);
            display_stats();
        }
    }
}
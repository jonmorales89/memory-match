$(document).ready(function(){
    $('.back').click(card_clicked);
    $('button.reset').click(reset_stats);
});

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var reset1 = null;
var reset2 = null;
var matches = 0; //Every time the application finds a match this variable should be incremented by 1
var attempts = 0; //Every time a user attempts a match (clicks 2nd card) the attempts should be incremented by 1
var accuracy = 0; // Accuracy is defined as a percentage of matches / attempts
var games_played = 0; //When the game is reset by clicking the reset button the games_played should be incremented by 1
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
    match_counter = 0;
    display_stats();
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
    var div1 = $('<div>').attr({id: 'myModal', class:'modal fade modal-lg', style:'margin: auto; top:25%;',role: 'dialog', 'aria-labelledby' : 'myLargeModalLabel' });
    var div2 = $('<div>').attr({class:'modal-dialog modal-lg', role: 'document'});
    var div3 = $('<div>').attr({class:'modal-content'});
    var divCont = $('<div>').attr({class:'modal-body', style:''}).html("<h1 class='text-center'>You Won!</h1><div class='modal-footer'><button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button></div>");
    $(div3).append(divCont);
    $(div2).append(div3);
    $(div1).append(div2);
    $('section').append(div1);
    $('#myModal').modal('show');

}

function card_clicked(){
    if(first_card_clicked===null){
        first_card_clicked = $(this).parent().children().children().attr('src');
        console.log("first_card_clicked: ",first_card_clicked);
        $(this).addClass('hideCard');
        reset1 = this;
        console.log(this);
    } else {
        second_card_clicked = $(this).parent().children().children().attr('src');
        console.log("second card is clicked;", second_card_clicked);
        $(this).addClass('hideCard');
        reset2 = this;
        attempts++;
        display_stats();
        if(first_card_clicked == second_card_clicked){
            match_counter++;
            console.log("match made");
            first_card_clicked = null;
            second_card_clicked = null;
            matches++;
            display_stats();
            if(match_counter == total_possible_matches){
                console.log("you won");
                reset_stats();
                winner();
            } else {
                console.log("click handler complete");
            }
        } else {
            console.log('wrong match');
            $('.back').off('click');
            setTimeout(resetCards,800);
        }
    }
}
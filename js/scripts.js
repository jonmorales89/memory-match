$(document).ready(function(){
    $('.back').click(card_clicked);
});

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var reset1 = null;
var reset2 = null;

function resetCards(){
    first_card_clicked = null;
    second_card_clicked = null;
    $(reset1).removeClass('hideCard');
    $(reset2).removeClass('hideCard');
    $('.back').click(card_clicked);
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
        if(first_card_clicked == second_card_clicked){
            match_counter++;
            console.log("match made");
            first_card_clicked = null;
            second_card_clicked = null;
            if(match_counter == total_possible_matches){
                console.log("you won");
            } else {
                console.log("click handler complete");
            }
        } else {
            console.log('wrong match');
            $('.back').off('click');
            setTimeout(resetCards,2000);

        }
    }
}
//Button assignments - Should stay relatively clean and refer to functions in the underworkings
$('#start-quiz').click(()=>{
    currentCard = '#quiz-card';
});

$('#view-high-scores').click(()=>{
    switchCard('#score-card');
    swapScoreButtons();
});

$('#hide-high-scores').click(()=>{
    switchCard(lastCard);
    swapScoreButtons();
});


//Begin underworkings
let currentCard = '#welcome-card';
let lastCard = '';
function switchCard(newCardStr){
    lastCard = currentCard;
    currentCard = newCardStr;
    $('.main-content').attr('hidden','');
    $(currentCard).attr('hidden',null);
}

function swapScoreButtons(){
    if(currentCard === '#score-card'){ //if score card is active
        $('#hide-high-scores').attr('hidden', null);
        $('#view-high-scores').attr('hidden', '');
    } else {
        $('#hide-high-scores').attr('hidden', '');
        $('#view-high-scores').attr('hidden', null);
    }
}
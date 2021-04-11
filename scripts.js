//magic numbers/vars
const timerStart = 60;
let timeLeft = timerStart;
let questionStartTime = Date.now();
let currentCard = '#welcome-card';
let lastCard = '';
let currentQuestion = 0;

//Button assignments - Should stay relatively clean and refer to functions in the underworkings
$('#start-quiz').click(()=>{
    switchCard('#quiz-card');
    startQuiz();
    changeQuizCard(0);
});

$('#answers').find('button').click(()=>{
    if(currentQuestion + 1 < questions.length){
        submitAnswer();
        changeQuizCard(++currentQuestion);
    } else {
        //Need to exit script and finish quiz
        finishQuiz();
        switchCard('#finish-card');
    }
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
function startQuiz(){ //handles the mechanical changes needed to start the quiz
    timeLeft = timerStart;
    updateTimeLeft();
}
function finishQuiz(){

}
function submitAnswer(){

}

function changeQuizCard(qNum){
    const questionObj = questions[qNum];
    $('#question-num').text(qNum + 1);
    $('#question-q').text(questionObj.question);
    $('#answers').find('button').each((i, element)=>{ //iterate over button elements
        element.textContent = questionObj.answers[i];
    });
}

function switchCard(newCardStr){ //switches the visible card to a new card
    lastCard = currentCard;
    currentCard = newCardStr;
    $('.main-content').attr('hidden','');
    $(currentCard).attr('hidden',null);
}

function updateTimeLeft(){
    $('#time-left').text() = timeLeft;
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
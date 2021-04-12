//magic numbers/vars
const timerStart = 60;
let timeLeft = timerStart;
let questionStartTime = nowSec();
let currentCard = '#welcome-card';
let lastCard = '';
let currentQuestion = 0;
let correctAnswers = 0;

//Button assignments - Should stay relatively clean and refer to functions in the underworkings
$('#start-quiz').click(()=>{
    switchCard('#quiz-card');
    startQuiz();
    changeQuizCard(0);
});

$('#answers').find('button').click((e)=>{
    if(currentQuestion + 1 < questions.length){
        submitAnswer(+$(e.target).data('answer-num'));
        changeQuizCard(++currentQuestion);
    } else {
        //Need to exit script and finish quiz
        submitAnswer(+$(e.target).data('answer-num'));
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
    questionStartTime = nowSec();
    $('#correct-popup').attr('hidden','');
    $('#incorrect-popup').attr('hidden','');
    updateTimeLeft();
}
function finishQuiz(){
    //
}
function submitAnswer(submittedAnswer){
    //check if answer is correct, if correct add to questions, if wrong remove time taken
    if(questions[currentQuestion].correctAnswer === submittedAnswer){
        $('#correct-answers').text(++correctAnswers);
        $('#correct-popup').attr('hidden',null);
        $('#incorrect-popup').attr('hidden','');
    } else {
        timeDeducted = nowSec() - questionStartTime + 1; //added a penalty of 1 second
        timeLeft -= timeDeducted;
        $('#time-deducted').text(timeDeducted);
        $('#correct-popup').attr('hidden','');
        $('#incorrect-popup').attr('hidden',null);
    }
    updateTimeLeft();
    questionStartTime = nowSec();
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
    $('#time-left').text(timeLeft);
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

function nowSec(){
    return Math.floor(Date.now()/1000);
}
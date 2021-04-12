//magic numbers/vars
const timerStart = 30;
let timeLeft = timerStart;
let questionStartTime = nowSec();
let currentCard = '#welcome-card';
let lastCard = '';
let currentQuestion = 0;
let correctAnswers = 0;
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
if(highScores[0]){renderTable()}

//Button assignments - Should stay relatively clean and refer to functions in the underworkings
$('#start-quiz').click(startQuiz);
$('#try-again').click(startQuiz);

$('#answers').find('button').click((e)=>{
    submitAnswer(+$(e.target).data('answer-num'));
    if(currentQuestion + 1 < questions.length){
        changeQuizCard(++currentQuestion);
    } else {
        //Need to exit script and finish quiz
        finishQuiz();
        switchCard('#finish-card');
    }
});

$('#submit-name').click(()=>{
    submitName($('#user-name').val());
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
    switchCard('#quiz-card');
    currentQuestion = 0;
    changeQuizCard(currentQuestion);
    timeLeft = timerStart;
    questionStartTime = nowSec();
    $('#correct-popup').attr('hidden','');
    $('#incorrect-popup').attr('hidden','');
    updateTimeLeft();
}
function finishQuiz(){
    if(timeLeft > 0){
        $('#submittal-form').attr('hidden',null);
        $('#finish-score').text(timeLeft);
    } else { //Lost the game, need to show loser screen
        
    }
}
function submitName(inName){
    const newEntry = {};
    newEntry.name = inName;
    newEntry.score = timeLeft;
    for(var i = 0; i < highScores.length && highScores[i].score > newEntry.score; i++){} //doing this because I'm evil and it lets me insert the new entry in order automatically
    highScores.splice(i, 0, newEntry);
    console.log(`added ${JSON.stringify(highScores)}`);
    localStorage.setItem('highScores',JSON.stringify(highScores));
    $('#submittal-form').attr('hidden','');
    renderTable();
}
function renderTable(){
    const scoreTable = $('#score-table');
    scoreTable.empty();
    let i = 1;
    for(let record of highScores){
        let rowContent = `
        <tr>
            <th scope='row'>${i++}</th>
            <td>${record.name}</td>
            <td>${record.score}</td>
        </tr>`;
        scoreTable.append(rowContent);
    }
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
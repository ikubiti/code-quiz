// Get all the elements in the HTML document
let viewScoreElement = document.querySelector('#high-score');
let timeStatusElement = document.querySelector('#timer');
let quizElement = document.querySelector('#quiz-container');
let headerElement = document.querySelector('header');

// Global variables for the coding quiz
const quizTime = 61;
const desiredQuestionSize = 15;
const quizQuestionSize = (desiredQuestionSize < quizQuestions.length)
        ? desiredQuestionSize : quizQuestions.length;
let scoreCounter = 0;
let timeCounter = 0;
let userName = '';
let finalScore = 0;
let currentQuestion;
let questionIndex;
let timer;
let answerFeedbackEl;
let nameInputEl;


// Save the quiz high scores
let setHighScores = function() {
    localStorage.setItem('highScores', JSON.stringify(highScoreList));
}

// Load the stored high scores if any or set it to a default value
let getHighScores = function() {
    var tempScoreList = JSON.parse(localStorage.getItem('highScores'));
    if(tempScoreList) {
        highScoreList = tempScoreList; 
    } else {
        setHighScores();
    }
}

// Present the Coding Quiz Introduction Page
let quizIntro = function() {
    var quizHeading = document.createElement('h1');
    quizHeading.innerHTML = 'Coding Quiz Challenge';
    var quizIntroElement = document.createElement('p');
    quizIntroElement.innerHTML =
        'Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your quiz time by ten seconds!';
    var quizStartButton = document.createElement('button');
    quizStartButton.setAttribute('class', 'quiz-button');
    quizStartButton.setAttribute('data-index', 10);
    quizStartButton.textContent = 'Start Quiz';
    timeStatusElement.textContent = '--';

    quizElement.appendChild(quizHeading);
    quizElement.appendChild(quizIntroElement);
    quizElement.appendChild(quizStartButton);
}

// Remove all descendants of an element
function removeAllChildNodes(parentElement) {
    parentElement.innerHTML = '';
}

function randomizeArray( myArray) {
    let currentIndex = myArray.length - 1;
    while(currentIndex > 0 ) {
        let randomIndex = Math.floor(Math.random() * (currentIndex + 1) );
        let value = myArray[currentIndex];
        myArray[currentIndex--] = myArray[randomIndex];
        myArray[randomIndex] = value;
    }
}

let displayQuestion = function() {
    // Get the current question
    currentQuestion = quizQuestions[questionIndex];
    let questionElement = document.createElement('p');
    questionElement.innerHTML = currentQuestion.question;
    questionElement.setAttribute('class', 'quiz-question');

    let quizAnswersEl = document.createElement('ol');
    let answersSize = currentQuestion.answers.length;
    for (let i = 0; i < answersSize; i++) {
        let li = document.createElement('li');
        li.setAttribute('data-index', i);

        let button = document.createElement('button');
        button.setAttribute('class', 'quiz-button');
        button.textContent = currentQuestion.answers[i];

        li.appendChild(button);
        quizAnswersEl.appendChild(li);
    }

    answerFeedbackEl = document.createElement('div');
    questionElement.appendChild(quizAnswersEl);

    // Reset Quiz Container
    removeAllChildNodes(quizElement);

    // Display the question and answer choices
    quizElement.appendChild(questionElement);
    quizElement.appendChild(answerFeedbackEl);
}

function renderQuestion(){
    // Update time counter
    timeStatusElement.textContent = --timeCounter;
    if (timeCounter <= 0 || questionIndex === quizQuestionSize) {
        clearInterval(timer);
        if (timeCounter < 0 ) {
            timeStatusElement.textContent = 0;
        }
        scoreEntry();
    } else {
        displayQuestion();
    }
}

let checkAnswer = function(index) {
    // check answer and provide appropriate feedback
    if (currentQuestion.answers[index] === currentQuestion.solution) {
        scoreCounter++;
        answerFeedbackEl.textContent = 'Correct answer!';
    } else {
        answerFeedbackEl.textContent = 'Wrong answer!';
        timeCounter -= 10;
    }

    questionIndex++;
}

let scoreEntry = function() {
    finalScore = Math.ceil((scoreCounter / quizQuestionSize) * 100);

    let scoreHeadingEl = document.createElement('h2');
    scoreHeadingEl.textContent = 'All Done!';

    let scoreDisplayEl = document.createElement('p');
    scoreDisplayEl.textContent = `Your final score is ${finalScore}.`;

    let scoreFormEl = document.createElement('form');
    scoreFormEl.setAttribute('id', 'score-form');

    let scoreLabelEl = document.createElement('label');
    scoreLabelEl.setAttribute('for', 'name-text');
    scoreLabelEl.textContent = 'Enter Your Name:';

    nameInputEl = document.createElement('input');
    nameInputEl.setAttribute('type', 'text');
    nameInputEl.setAttribute('name', 'name-text');

    let nameButtonEl = document.createElement('button');
    nameButtonEl.setAttribute('data-index', 11);
    nameButtonEl.textContent = 'submit';

    scoreFormEl.appendChild(scoreLabelEl);
    scoreFormEl.appendChild(nameInputEl);
    scoreFormEl.appendChild(nameButtonEl);

    // Reset Quiz Container
    removeAllChildNodes(quizElement);

    // Display the score entry form
    quizElement.appendChild(scoreHeadingEl);
    quizElement.appendChild(scoreDisplayEl);
    quizElement.appendChild(scoreFormEl);
}

let updateScore = function() {
    let newUserName = nameInputEl.value.trim();
    let returnUser = highScoreList.findIndex(function(record) {
        return record.name === newUserName;
    });

    if(returnUser != -1) {
        if(highScoreList[returnUser].score > finalScore) {
            return;
        }

        highScoreList.splice(returnUser, 1);
    }

    let userRecord = {
        name: newUserName,
        score: finalScore,
    };

    // add current score to existing highScoreList
    highScoreList.push(userRecord);
    for(let i = 0; i < highScoreList.length - 1; i++) {
        if(highScoreList[i].score < highScoreList[highScoreList.length - 1].score) {
            highScoreList.splice(i, 0, highScoreList[highScoreList.length - 1]);
            highScoreList.pop();
            break;
        }
    }

    // Remove the last score from the highScoreList
    if(highScoreList.length > 5) {
        highScoreList.pop();
    }

    // Save the highScoreList
    setHighScores();
}

function displayHighScores() {
    // Hide the header 
    headerElement.setAttribute('class', 'hide-target');
    let scoreHeadingEl = document.createElement('h2');
    scoreHeadingEl.textContent = 'Current High Scores!';

    let scoreListEl = document.createElement('ol');
    for (let i = 0; i < highScoreList.length; i++) {
        let user = highScoreList[i];
        let li = document.createElement('li');
        // li.setAttribute('data-index', i);
        li.textContent = `${user.name} - ${user.score}`;
        scoreListEl.appendChild(li);
    }

    let startButtonEl = document.createElement('button');
    startButtonEl.setAttribute('data-index', 12);
    startButtonEl.textContent = 'Go Back';

    let clearButtonEl = document.createElement('button');
    clearButtonEl.setAttribute('data-index', 13);
    clearButtonEl.textContent = 'Clear Highscores';

    // Reset Quiz Container
    removeAllChildNodes(quizElement);

    // Display the list of high scores
    quizElement.appendChild(scoreHeadingEl);
    quizElement.appendChild(scoreListEl);
    quizElement.appendChild(startButtonEl);
    quizElement.appendChild(clearButtonEl);
}

let resetHighScores = function() {
    highScoreList = [];
    setHighScores();
    displayHighScores();
}

// Starts the coding quiz challenge
let startQuiz = function() {
    randomizeArray(quizQuestions);
    scoreCounter = 0;
    questionIndex = 0;
    timeCounter = quizTime;
    timer = setInterval(renderQuestion, 1000);
} 

// Handles all events from quiz container element
let quizController = function( event ) {
    event.preventDefault();
    event.stopPropagation();

    // console.log(event);
    // Filter events
    let element = event.target;
    if (element.matches('button' , 'submit') !== true) {
        return;
    }

    // Check for event type
    let dataID = element.getAttribute('data-index');
    if(!dataID) {
        dataID = element.parentElement.getAttribute('data-index');
    }

    switch (dataID) {
        case '10':
            startQuiz();
            break;

        case '11':
            updateScore();
            displayHighScores();
            break;

        case '12':
            headerElement.setAttribute('class', 'show-target');
            removeAllChildNodes(quizElement);
            quizIntro();
            break;

        case '13':
            resetHighScores();
            break;

        default:
            checkAnswer(dataID);
    }
}

// Initialize and start the quiz user interface
function init() {
    getHighScores();
    quizIntro();
}

// Start the quiz application when the page gets loaded
init();

// handles all events within the application
quizElement.addEventListener('click', quizController);
quizElement.addEventListener('submit', quizController);
viewScoreElement.addEventListener('click', displayHighScores);



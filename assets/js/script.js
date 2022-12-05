// Get all the elements in the HTML document
let viewScoreElement = document.querySelector('#high-score');
let timeStatusElement = document.querySelector('#timer');
let quizElement = document.querySelector('#quiz-container');
let headerElement = document.querySelector('header');

// Global variables for the coding quiz
const quizTime = 61;
const desiredQuestionSize = 10;
const quizQuestionSize = (desiredQuestionSize < quizQuestions.length)
        ? desiredQuestionSize : quizQuestions.length;
const timeLost = 10;
const highScoreListSize = 5;
let scoreCounter = 0;
let timeCounter = 0;
let userName = '';
let finalScore = 0;
let isSet = true;
let currentQuestion;
let questionIndex;
let timer;
let answerFeedbackEl;
let nameInputEl;
let savedIndex;
let questionNumber;


// Save the quiz high scores
let setHighScores = function() {
    localStorage.setItem('highScores', JSON.stringify(highScoreList));
}

// Load the stored high scores if any or set it to a default value
let getHighScores = function() {
    let tempScoreList = JSON.parse(localStorage.getItem('highScores'));
    if(tempScoreList) {
        highScoreList = tempScoreList; 
    } else {
        setHighScores();
    }
}

// Present the Coding Quiz Introduction Page
let quizIntro = function() {
    // Create the elements
    let quizHeading = document.createElement('h1');
    quizHeading.setAttribute('class', 'instr-header');
    quizHeading.innerHTML = 'Coding Quiz Challenge';
    let quizIntroElement = document.createElement('p');
    quizIntroElement.textContent = `Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your quiz time by ${timeLost} seconds!`;
    let quizIntroContent = document.createElement('p');
    quizIntroContent.setAttribute('class', 'bright-blue');
    quizIntroContent.setAttribute('style', 'font-weight:700');
    quizIntroContent.textContent = `Note, you have ${quizTime - 1} seconds to answer ${quizQuestionSize} questions!`;
    
    let quizStartButton = document.createElement('button');
    quizStartButton.setAttribute('class', 'quiz-button');
    quizStartButton.setAttribute('data-index', 10);
    quizStartButton.textContent = 'Start Quiz';
    timeStatusElement.textContent = '--';

    // Append the elements
    quizElement.appendChild(quizHeading);
    quizElement.appendChild(quizIntroElement);
    quizElement.appendChild(quizIntroContent);
    quizElement.appendChild(quizStartButton);
}

// Remove all descendants of an element
function removeAllChildNodes(parentElement) {
    while (parentElement.firstChild) {
        var child = parentElement.firstChild;
        if (child.hasChildNodes()) {
            removeAllChildNodes(child);
        }
        parentElement.removeChild(child);
    }
}

// Randomize any array using the Durstenfeld shuffle algorithm
function randomizeArray( myArray) {
    let currentIndex = myArray.length - 1;
    while(currentIndex > 0 ) {
        let randomIndex = Math.floor(Math.random() * (currentIndex + 1) );
        let value = myArray[currentIndex];
        myArray[currentIndex--] = myArray[randomIndex];
        myArray[randomIndex] = value;
    }
}

// Render a question and its multiple choice answers
let displayQuestion = function() {
    // Render only once per question
    if(questionNumber === questionIndex){
        return;
    }

    questionNumber = questionIndex;
    // Get the current question
    currentQuestion = quizQuestions[questionIndex];
    let questionElement = document.createElement('div');
    questionElement.textContent = currentQuestion.question;
    questionElement.setAttribute('class', 'quiz-question');
    let gapSpace = document.createElement('div');
    gapSpace.setAttribute('class', 'space-down');
    questionElement.appendChild(gapSpace);

    randomizeArray(currentQuestion.answers);
    let answersSize = currentQuestion.answers.length;
    for (let i = 0; i < answersSize; i++) {
        let option = document.createElement('div');
        option.setAttribute('class', 'quiz-button answer-btn list-display');
        option.setAttribute('data-index', i);
        option.textContent = `${i + 1} - ${currentQuestion.answers[i]}`;
        questionElement.appendChild(option);
    }

    answerFeedbackEl = document.createElement('div');
    // questionElement.appendChild(quizAnswersEl);

    // Reset Quiz Container
    removeAllChildNodes(quizElement);

    // Display the question and answer choices
    quizElement.appendChild(questionElement);
    quizElement.appendChild(answerFeedbackEl);
}

// Decide whether to render a new question or end the quiz
function renderQuestion(){
    // Update time counter
    timeStatusElement.textContent = --timeCounter;
    if(timeCounter < 10 && isSet){
        isSet = false;
        timeStatusElement.setAttribute('class', 'change-primary');
    }

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

// Check answer 
let checkAnswer = function(index) {
    // Check answer only once per question
    if (questionOnce === questionIndex) {
        return;
    }

    questionOnce = questionIndex;
    // check answer and provide appropriate feedback
    if (currentQuestion.answers[index] === currentQuestion.solution) {
        answerFeedbackEl.setAttribute('class', 'feedback feedback-bdr');
        scoreCounter++;
        answerFeedbackEl.textContent = 'Correct answer!';
    } else {
        answerFeedbackEl.setAttribute('class', 'feedback danger-red');
        answerFeedbackEl.textContent = 'Wrong answer!';
        timeCounter -= timeLost;
    }

    // Give user adequate to observe feedback
    setTimeout(increaseQuestion, 300);
}

// Increase the question counter
function increaseQuestion(){
    questionIndex++;
}

// Accept new score from a user
let scoreEntry = function() {
    finalScore = Math.ceil((scoreCounter / quizQuestionSize) * 100);

    let scoreHeadingEl = document.createElement('h2');
    scoreHeadingEl.setAttribute('class', 'outline-header');
    scoreHeadingEl.textContent = 'All Done!';

    let scoreDisplayEl = document.createElement('p');
    scoreDisplayEl.setAttribute('class', 'quiz-question');
    scoreDisplayEl.textContent = `Your final score is ${finalScore}.`;

    let scoreFormEl = document.createElement('form');
    scoreFormEl.setAttribute('id', 'score-form');

    let scoreLabelEl = document.createElement('label');
    scoreLabelEl.setAttribute('for', 'name-text');
    scoreLabelEl.setAttribute('class', 'quiz-question');
    scoreLabelEl.textContent = 'Enter Your Name: ';

    nameInputEl = document.createElement('input');
    nameInputEl.setAttribute('type', 'text');
    nameInputEl.setAttribute('name', 'name-text');

    let nameButtonEl = document.createElement('button');
    nameButtonEl.setAttribute('class', 'score-button');
    nameButtonEl.setAttribute('data-index', 11);
    nameButtonEl.textContent = 'Submit';

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

// Store the new score if it qualifies to be a top score
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
    savedIndex = highScoreList.length - 1;
    for(let i = 0; i < highScoreList.length - 1; i++) {
        if(highScoreList[i].score < highScoreList[highScoreList.length - 1].score) {
            highScoreList.splice(i, 0, highScoreList[highScoreList.length - 1]);
            savedIndex = i;
            highScoreList.pop();
            break;
        }
    }

    // Remove the last score from the highScoreList
    if (highScoreList.length > highScoreListSize) {
        highScoreList.pop();
    }

    // Save the highScoreList
    setHighScores();
}

// Display the high score list
function displayHighScores() {
    // Hide the header 
    headerElement.setAttribute('class', 'hide-target');
    let scoreHeadingEl = document.createElement('h2');
    scoreHeadingEl.setAttribute('class', 'outline-header');
    scoreHeadingEl.textContent = 'Current High Scores!';

    let msg = document.createElement('div');
    let scoreListEl = document.createElement('ol');
    let listSize =
        highScoreList.length < highScoreListSize ? highScoreList.length : highScoreListSize;
    for (let i = 0; i < listSize; i++) {
        let user = highScoreList[i];
        let li = document.createElement('li');
        li.setAttribute('class', 'list-display bright-blue');
        if (i === savedIndex) {
            savedIndex = highScoreListSize;
            li.setAttribute('class', 'list-display bright-blue outline-header');
            msg.setAttribute('class', 'bright-turquoise high-msg');
            msg.textContent = `Congrats ${user.name}! You made into the High Score List!`;
        }
        li.textContent = `${user.name} - ${user.score}`;
        scoreListEl.appendChild(li);
    }

    let startButtonEl = document.createElement('button');
    startButtonEl.setAttribute('data-index', 12);
    startButtonEl.setAttribute('class', 'score-button');
    startButtonEl.textContent = 'Go Back';

    let clearButtonEl = document.createElement('button');
    clearButtonEl.setAttribute('data-index', 13);
    clearButtonEl.setAttribute('class', 'score-button');
    clearButtonEl.textContent = 'Clear Highscores';

    // Reset Quiz Container
    removeAllChildNodes(quizElement);
    // Make sure the time is cleared
    clearInterval(timer);

    // Display the list of high scores
    quizElement.appendChild(scoreHeadingEl);
    quizElement.appendChild(scoreListEl);
    quizElement.appendChild(startButtonEl);
    quizElement.appendChild(clearButtonEl);
    quizElement.appendChild(msg);
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
    questionNumber = -1;
    questionOnce = -1;
    timer = setInterval(renderQuestion, 1000);
} 

// Handles all events from quiz container element
let quizController = function( event ) {
    event.preventDefault();
    event.stopPropagation();

    // filter out events by data- attribute
    let dataID = event.target.dataset.index;
    if (!dataID) {
        return;
    }

    switch (dataID) {
        case '10':
            startQuiz();
            break;

        case '11':
            // validate name entry
            if (nameInputEl.value.trim().length < 1) {
                scoreEntry();
            } else {
                updateScore();
                displayHighScores();
            }
            break;

        case '12':
            headerElement.setAttribute('class', 'show-target');
            removeAllChildNodes(quizElement);
            timeStatusElement.setAttribute('class', 'reset-primary');
            isSet = true;
            quizIntro();
            break;

        case '13':
            resetHighScores();
            break;

        default:
            checkAnswer(dataID);
    }
}

// Define the initiation function
let init = function() {
    getHighScores();
    quizIntro();
};

// Start the quiz application when the page gets loaded
init();

// handles all events within the application
quizElement.addEventListener('click', quizController);
quizElement.addEventListener('submit', quizController);
viewScoreElement.addEventListener('click', displayHighScores);



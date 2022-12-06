# code-quiz

## Description

This application enables any potential web developer to prepare for the interview process by presenting mock coding assessment questions. The user is presented with an interactive timed coding quiz with multiple-choice questions. The app runs in any modern browser and uses JavaScript to dynamically update the HTML and CSS code. It has a clean and polished, responsive user interface that adapts to multiple screen sizes.

My objectives for this application is based on the following user story and acceptance criteria;

## User Story

```
As a coding boot camp student
I want to take a timed quiz on JavaScript fundamentals that stores high scores
S0 that I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
Given I am taking a code quiz
When I click the start button
Then a timer starts and I am presented with a question
When I answer a question
Then I am presented with another question
When I answer a question incorrectly
Then time is subtracted from the clock
When all questions are answered or the timer reaches 0
Then the game is over
When the game is over
Then I can save my initials and my score
```

## Additional Features 

```
In addition to acceptance criteria above, the application has additional features to improve the user experience. These extra features include:

*  It has variable high score list storage: The app stores and presents the top 5 achievers however, it can be made to store any number of high scores if desired. Once set, it will always display the selected number of high scores.
* Whenever a user gets a high score, the app automatically places it in the right position and informs the user the successful score.
* If a user returns but scores a lower score than a previous test, the app ignores the new low score. However, if the user performed better, the new high score gets saved.
* The app informs the user about the number of questions and the time period to complete the quiz.
* The app randomly presents the questions for each quiz section. The answers are also randomly placed in each quiz session. 
* The app uses color coding to aid the user visually receive feedback about each question. It also provides the user with adequate time to observe each feedback.
* The app also provides time visual indication when the time left is less than 10seconds.
* Every button, input form, and clickable display presents visual hints when the user hovers over it.
```

## Installation

Please visit https://ikubiti.github.io/code-quiz/

## Usage

The application starts by presenting a landing page where the user may view a list of previous high scores or start a new quiz session. Once a new quiz session gets initiated, the user will answer each question and get the appropriate feedback for each question. If the user gets a question wrong, time is deducted from the available time. Every session presents the user with unique question and answer order, no two quiz sessions will have the same order of questions and answers. Once completed, the app displays the user's score and request for their name. A user can't present an empty name but can present initials, first name only, last name only, full name, nickname, etc. 

If the score is within the top 5 scores, it get displayed and highlighted in the high score list, otherwise, it's not recognized. A user can clear the high score and start a new ranking order, or start a new session to gain a higher score. 

The image below is the landing page a visitor gets when they enter the website address on a large screen computer. ![Coding Quiz Challenge Desktop Landing Page](./assets/images/Landing%20Page%20Desktop.jpg)


The same landing page on a tablet device. ![Coding Quiz Challenge Tablet Landing Page](./assets/images/Landing%20Page%20Tablet.jpg)


The landing page on a mobile device. ![Coding Quiz Challenge Mobile Landing Page](./assets/images/Landing%20Page%20Mobile.jpg)


The app presenting visual feedback when a user hovers over the start quiz button. ![Application highlights the start button](./assets/images/Hovering%20over%20any%20button.jpg)


The visual feedback when user hovers on the view high scores ![The app highlights the view high score link](./assets/images/Hovering%20over%20View%20Score.jpg)


The default high score list. ![Default high score list](./assets/images/Default%20High%20Score%20List.jpg)


The app displaying a question ![A question display](./assets/images/Question%20Display.jpg)


The app emphasizes any multiple choice answer when the user hovers over it![A highlighted multiple choice answer on hovering](./assets/images/Moving%20over%20the%20answers.jpg)


Correct Answer Feedback. ![Correct answer feedback](./assets/images/User%20Correct%20Feedback.jpg)


The app providing feedback for a wrong answer choice. ![Wrong answer feedback](./assets/images/Wrong%20Answer%20Feedback.jpg)


High Score entry page for new user![Highlighted input form for new user name](./assets/images/Score%20Entry%20with%20Highlighting.jpg)


Display after a successful high score. ![Highlighted position of new high score](./assets/images/Current%20Score%20With%20New%20User.jpg)


A different user also scoring a high score. ![Highlighted position of new high score for a different user](./assets/images/A%20new%20user.jpg)


Resetting the high score history ![Clearing the high score](./assets/images/Clear%20High%20Scores.jpg)


## Credits

N/A

## License

Licensed under the [MIT](LICENSE.txt) license.
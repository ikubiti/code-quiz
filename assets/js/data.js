// Temporary high score list 
var highScoreList = [
    {
        name: 'Ben Anybody',
        score: 50,
    },
    {
        name: 'Michael Somewhere',
        score: 40,
    },
    {
        name: 'Andre Nobody',
        score: 35,
    },
    {
        name: 'Isaac Nowhere',
        score: 30,
    },
    {
        name: 'Thomas Somebody',
        score: 20,
    },
];

// The set of quiz questions
const quizQuestions = [
    {
        question: '___ is the language we use to style an HTML document',
        answers: ['HTML', 'CSS', 'JavaScript', 'Git', 'JQuery'],
        solution: 'CSS',
    },
    {
        question: 'In JavaScript, a string is any text inside _______',
        answers: [
            'Parenthesis',
            'Brackets',
            'Double or Single Quotes',
            'Curly Brackets',
            'Angle Brackets',
        ],
        solution: 'Double or Single Quotes',
    },
    {
        question: 'The standard language used to markup Web pages is _______.',
        answers: ['PHP', 'CSS', 'JavaScript', 'XML', 'HTML'],
        solution: 'HTML',
    },
    {
        question: 'A boolean can hold only two logical values?',
        answers: ['True', 'False'],
        solution: 'True',
    },
    {
        question: 'Common used data types DO NOT include:',
        answers: ['string', 'double', 'Number', 'booleans'],
        solution: 'double',
    },
    {
        question: '___ is a format for storing and transporting data.',
        answers: ['JavaScript', 'JavaScript Object', 'Classes', 'JSON'],
        solution: 'JSON',
    },
    {
        question: 'The ___ object represents an open window in a browser.',
        answers: ['class', 'string', 'window', 'JSON', 'array'],
        solution: 'window',
    },
    {
        question:
            'The condition in an if / else statement is enclosed within ___.',
        answers: [
            'Quotes',
            'Curly Brackets',
            'Parenthesis',
            'Square Brackets',
            'None of the answers',
        ],
        solution: 'Curly Brackets',
    },
    {
        question:
            'HTML comments are displayed in the browser and they help document your HTML source code.',
        answers: ['True', 'False'],
        solution: 'False',
    },
    {
        question:
            "___ is used to create space around an element's content, inside of any defined borders.",
        answers: ['Padding', 'Border', 'Margin', 'Content'],
        solution: 'Padding',
    },
    {
        question: 'Arrays in JavaScript can be used to store ___.',
        answers: [
            'Numbers',
            'Strings',
            'Objects',
            'Booleans',
            'All of the answers',
        ],
        solution: 'All of the answers',
    },
    {
        question: 'A CSS ____ selects the HTML element(s) you want to style.',
        answers: ['Selector', 'Comment', 'Text', 'Icon'],
        solution: 'Selector',
    },
    {
        question:
            'HTML styles are titles or subtitles that you want to display on a webpage',
        answers: ['True', 'False'],
        solution: 'False',
    },
    {
        question: 'HTML has six(6) headings types from h1 to h6?',
        answers: ['True', 'False'],
        solution: 'True',
    },
    {
        question:
            'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            'JavaScript',
            'console.log',
            'terminal/bash',
            'for loops',
            'while loops',
        ],
        solution: 'console.log',
    },
    {
        question:
            'Strings are zero-based index with the first character in position 0, the second in 1, etc. ',
        answers: ['True', 'False'],
        solution: 'True',
    },
    {
        question: 'The console object is a property of the window object',
        answers: ['True', 'False'],
        solution: 'True',
    },
    {
        question:
            'The CSS ____ properties are used to create space around elements, outside of any defined borders.',
        answers: ['border', 'content', 'margin', 'padding'],
        solution: 'margin',
    },
    {
        question:
            'The HTML ____ attribute is used to specify a unique id for an HTML element.',
        answers: ['class', 'background', 'id', 'span', 'paragraph'],
        solution: 'id',
    },
    {
        question:
            'The ____ property is the most important CSS property for controlling layout.',
        answers: ['Lists', 'Borders', 'Margins', 'Display'],
        solution: 'Display',
    },
];

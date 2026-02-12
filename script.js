// DOM elements
const startScreen = $("#start-screen");
const quizScreen = $("#quiz-screen");
const finishScreen = $("#finish-screen");
const startButton = $(".start-btn");
const questionText = $(".question-text");
const answerContainer = $(".answer-container");
const questionCurrent = $("#question-current");
const questionTotal = $("#question-total");
const answerButton = $(".answer-btn");
const scoreCurrent = $("#score");
const finalScore = $("#score-final");
const scoreTotal = $("#score-max");
const restartButton = $(".restart-btn");
const scoreMessage = $(".score-message");
const progressBar = $(".progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

/* QUIZ STATE WARS */
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

questionTotal.text(quizQuestions.length);
scoreTotal.text(quizQuestions.length);

resetQuiz();

startButton.click(() => {
  startQuiz();
});

function startQuiz() {
  resetScore();
  startScreen.removeClass("active");
  quizScreen.addClass("active");
  loadQuestion();
}

restartButton.click(() => {
  resetQuiz();
});

function resetQuiz() {
  resetScore();
  answersDisabled = false;
  progressBar.css("width", "0%");
  startScreen.addClass("active");
  quizScreen.removeClass("active");
  finishScreen.removeClass("active");
}

function startQuiz() {
  startScreen.removeClass("active");
  quizScreen.addClass("active");
  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.text(currentQuestion.question);
  answerContainer.empty();  
  var answers = quizQuestions[currentQuestionIndex].answers;
  answers.forEach((answer, index) => { 
        answerContainer.append("<div class='answer-btn'>" + answer.text + "</div>");
    })
  }

  function checkAnswer () {
    $(".answer-btn").on("click", () => {
      console.log();
      $(".answer-btn").off("click");
   })
      
  }

  function resetScore()
  {
    currentQuestionIndex = 0;
    score = 0;
    scoreCurrent.text(score);
    questionCurrent.text(currentQuestionIndex +1 );
  }



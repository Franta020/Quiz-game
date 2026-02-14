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
const scoreFinal = $("#score-final");
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
  updateProgress();
  answerContainer.empty();
  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("div");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    answerContainer.append(button);
    button.dataset.correct = answer.correct;
  });
  $(".answer-btn").on("click", answerEvent());
  awaitAnswer();
}

function updateProgress() {
  questionCurrent.text(currentQuestionIndex + 1);
  questionTotal.text(quizQuestions.length);
  scoreCurrent.text(score);
  let progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.css("width", progressPercent + "%");
}

function awaitAnswer() {
  $(".answer-btn").on("click", answerEvent());
}

function answerEvent() {
  return (event) => {
    let answer = event.target.dataset.correct;
    if (answer === "true") {
      animateResult(answer, event);
    } else {
      animateResult(answer, event);
    }
    $(".answer-btn").off("click", answerEvent());
  };
}

function animateResult(answer, event) {
  if (answer === "true") {
    event.target.classList.add("correct");
    score++;
    if (currentQuestionIndex === quizQuestions.length - 1) {
      quizScreen.removeClass("active");
      finishScreen.addClass("active");
      generateResult();
    } else {
      currentQuestionIndex++;
      setTimeout(loadQuestion, 1000);
    }
  } else if (answer === "false") {
    if (currentQuestionIndex === quizQuestions.length - 1) {
      quizScreen.removeClass("active");
      finishScreen.addClass("active");
      generateResult();
    } else {
      event.target.classList.add("wrong");
      currentQuestionIndex++;
      setTimeout(loadQuestion, 1000);
    }
  }
}

function generateResult() {
  scoreFinal.text(score);
  scoreTotal.text(quizQuestions.length);
  if (scoreFinal.text() === 1) {
    scoreMessage.text("You are as dumb as a dolphin");
  } else if (scoreFinal.text() === 2) {
    scoreMessage.text("You should realy learn some more");
  } else if (scoreFinal.text() === 3) {
    scoreMessage.text("You are not so dumb");
  } else if (scoreFinal.text() === 4) {
    scoreMessage.text("You are a prety smart cookie");
  } else {
    scoreMessage.text("You are sort of a genius");
  }
}

function resetScore() {
  currentQuestionIndex = 0;
  score = 0;
  scoreCurrent.text(score);
  questionCurrent.text(currentQuestionIndex + 1);
}

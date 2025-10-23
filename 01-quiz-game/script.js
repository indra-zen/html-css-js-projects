import { quizQuestions } from "./questions.js";

// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // apa itu dataset? ini adalah properti dari elemen button yang memungkinkan Anda menyimpan data kustom
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Di sini Array.from() digunakan untuk mengubah NodeList yang dikembalikan oleh answersContainer.children menjadi array, ini karena NodeList bukan array dan kita perlu menggunakan method forEach
  Array.from(answersContainer.children).forEach((button) => button.classList.add(button.dataset.correct === "true" ? "correct" : button === selectedButton ? "incorrect" : ""));

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) showQuestion();
    else showResults();
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  const percentage = (score / quizQuestions.length) * 100;

  switch (true) {
    case percentage === 100:
      resultMessage.textContent = "Sempurna! Kamu jenius!";
      break;
    case percentage >= 80:
      resultMessage.textContent = "Kerja bagus! Kamu menguasai materinya!";
      break;
    case percentage >= 60:
      resultMessage.textContent = "Usaha yang baik! Terus belajar!";
      break;
    case percentage >= 40:
      resultMessage.textContent = "Lumayan! Coba lagi untuk meningkatkan!";
      break;
    default:
      resultMessage.textContent = "Terus belajar! Kamu akan lebih baik!";
      break;
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
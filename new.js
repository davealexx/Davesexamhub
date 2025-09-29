// Questions grouped by subject
const subjects = {
  english: [
    {
      question: "What is the past tense of 'go'?",
      answers: [
        { text: "Goed", correct: false },
        { text: "Went", correct: true },
        { text: "Go", correct: false },
        { text: "Gone", correct: false },
      ],
    },
    {
      question: "Which of these words is a vowel?",
      answers: [
        { text: "B", correct: false },
        { text: "A", correct: true },
        { text: "K", correct: false },
        { text: "M", correct: false },
      ],
    },
    // ... add more English questions here
  ],

  math: [
    {
      question: "What is 5 + 3?",
      answers: [
        { text: "6", correct: false },
        { text: "8", correct: true },
        { text: "9", correct: false },
        { text: "7", correct: false },
      ],
    },
    {
      question: "Which of these is a fraction?",
      answers: [
        { text: "1/2", correct: true },
        { text: "12", correct: false },
        { text: "5", correct: false },
        { text: "100", correct: false },
      ],
    },
    // ... add more Math questions
  ],

  physics: [
    {
      question: "What force pulls objects toward the Earth?",
      answers: [
        { text: "Magnetism", correct: false },
        { text: "Gravity", correct: true },
        { text: "Friction", correct: false },
        { text: "Energy", correct: false },
      ],
    },
    // ... add more Physics questions
  ],

  biology: [
    {
      question: "What part of the plant makes food?",
      answers: [
        { text: "Root", correct: false },
        { text: "Leaf", correct: true },
        { text: "Stem", correct: false },
        { text: "Flower", correct: false },
      ],
    },
    // ... add more Biology questions
  ],
};

// DOM Elements
const subjectButtons = document.querySelectorAll(".subject-btn");
const subjectSection = document.querySelector(".subjects");
const examSection = document.getElementById("examSection");
const subjectTitle = document.getElementById("subject-title");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentSubject = "";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Subject button click
subjectButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentSubject = btn.dataset.subject;
    currentQuestions = subjects[currentSubject];
    subjectTitle.textContent =
      currentSubject.charAt(0).toUpperCase() + currentSubject.slice(1) + " Exam";

    subjectSection.classList.add("d-none");
    examSection.classList.remove("d-none");
    startQuiz();
  });
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = currentQuestions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn", "btn-outline-dark", "w-100", "mb-2");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("btn-success");
    score++;
  } else {
    selectedBtn.classList.add("btn-danger");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("btn-success");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${currentQuestions.length}!`;
  nextButton.innerHTML = "Try Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < currentQuestions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});


const questions = [
  {
    question: "What is the basic unit of life?",
    answers: [
      { text: "Atom", correct: false },
      { text: "Molecule", correct: false },
      { text: "Cell", correct: true },
      { text: "Organ", correct: false }
    ]
  },
  {
    question: "Which gas do humans need to breathe to stay alive?",
    answers: [
      { text: "Carbon dioxide", correct: false },
      { text: "Oxygen", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false }
    ]
  },
  {
    question: "Which organ pumps blood throughout the body?",
    answers: [
      { text: "Lungs", correct: false },
      { text: "Liver", correct: false },
      { text: "Heart", correct: true },
      { text: "Kidney", correct: false }
    ]
  },
  {
    question: "Which part of a plant makes food?",
    answers: [
      { text: "Stem", correct: false },
      { text: "Leaves", correct: true },
      { text: "Roots", correct: false },
      { text: "Flowers", correct: false }
    ]
  },
  {
    question: "What is the green pigment in plants called?",
    answers: [
      { text: "Chlorophyll", correct: true },
      { text: "Hemoglobin", correct: false },
      { text: "Melanin", correct: false },
      { text: "Keratin", correct: false }
    ]
  },
  {
    question: "Which organ helps in breathing?",
    answers: [
      { text: "Heart", correct: false },
      { text: "Lungs", correct: true },
      { text: "Kidneys", correct: false },
      { text: "Stomach", correct: false }
    ]
  },
  {
    question: "Which of these is NOT a sense organ?",
    answers: [
      { text: "Eye", correct: false },
      { text: "Ear", correct: false },
      { text: "Skin", correct: false },
      { text: "Hair", correct: true }
    ]
  },
  {
    question: "What do humans use to taste food?",
    answers: [
      { text: "Nose", correct: false },
      { text: "Tongue", correct: true },
      { text: "Skin", correct: false },
      { text: "Eyes", correct: false }
    ]
  },
  {
    question: "Which blood cells help fight diseases?",
    answers: [
      { text: "Red blood cells", correct: false },
      { text: "White blood cells", correct: true },
      { text: "Platelets", correct: false },
      { text: "Plasma", correct: false }
    ]
  },
  {
    question: "Which organ is known as the ‘control center’ of the body?",
    answers: [
      { text: "Liver", correct: false },
      { text: "Brain", correct: true },
      { text: "Heart", correct: false },
      { text: "Kidneys", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons"); // ✅ corrected name
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
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
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; // ✅ fixed template string
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
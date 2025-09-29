
const questions = [
    {
        question: "Which of the following is a noun?",
        answers: [
            { text: "Run", correct: false },
            { text: "Book", correct: true },
            { text: "Quickly", correct: false },
            { text: "Happy", correct: false },
        ]
    },
    {
        question: "Which word is an adjective?",
        answers: [
            { text: "Blue", correct: true },
            { text: "Sing", correct: false },
            { text: "Dog", correct: false },
            { text: "Play", correct: false },
        ]
    },
    {
        question: "Which of these is a verb?",
        answers: [
            { text: "Jump", correct: true },
            { text: "Chair", correct: false },
            { text: "Green", correct: false },
            { text: "Slowly", correct: false },
        ]
    },
    {
        question: "Which word is a pronoun?",
        answers: [
            { text: "He", correct: true },
            { text: "Apple", correct: false },
            { text: "Running", correct: false },
            { text: "Tall", correct: false },
        ]
    },
    {
        question: "Which of the following is a preposition?",
        answers: [
            { text: "Under", correct: true },
            { text: "Fast", correct: false },
            { text: "Bird", correct: false },
            { text: "Eat", correct: false },
        ]
    },
    {
        question: "Which word is an adverb?",
        answers: [
            { text: "Quickly", correct: true },
            { text: "Table", correct: false },
            { text: "Happy", correct: false },
            { text: "Car", correct: false },
        ]
    },
    {
        question: "Which of these words is a conjunction?",
        answers: [
            { text: "And", correct: true },
            { text: "Run", correct: false },
            { text: "Book", correct: false },
            { text: "Blue", correct: false },
        ]
    },
    {
        question: "Which of the following is a plural noun?",
        answers: [
            { text: "Cats", correct: true },
            { text: "Dog", correct: false },
            { text: "Run", correct: false },
            { text: "Slow", correct: false },
        ]
    },
    {
        question: "Which of these is a sentence?",
        answers: [
            { text: "The sun is hot.", correct: true },
            { text: "Running fast", correct: false },
            { text: "Beautiful blue", correct: false },
            { text: "Quickly slowly", correct: false },
        ]
    },
    {
        question: "Which of the following words starts with a vowel?",
        answers: [
            { text: "Apple", correct: true },
            { text: "Ball", correct: false },
            { text: "Cat", correct: false },
            { text: "Dog", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons"); // ✅ corrected name
const nextButton = document.getElementById("next-btn");
const empty = document.querySelector('.empty');

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
      empty.innerHTML = `<a href="../exam.html" class="btn btn-primary" style="text-decoration: none;">Back to Exam</a>`
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

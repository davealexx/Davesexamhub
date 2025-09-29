
const questions = [
    {
        question: "Which of the following is a noun word?",
        answers: [
            { text: "Eating", correct: false },
            { text: "Car", correct: true },
            { text: "Cookig", correct: false },
            { text: "Counting", correct: false },

        ]
    },
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]

    },
    {
        question: "Which of the following is a noun word?",
        answers: [
            { text: "Eating", correct: false },
            { text: "Car", correct: true },
            { text: "Cookig", correct: false },
            { text: "Counting", correct: false },
        ]
    },
    {
        question: "Which of the following is a noun word?",
        answers: [
            { text: "Eating", correct: false },
            { text: "Car", correct: true },
            { text: "Cookig", correct: false },
            { text: "Counting", correct: false },
        ]
    },
    {
        question: "Which of the following is a noun word?",
        answers: [
            { text: "Eating", correct: false },
            { text: "Car", correct: true },
            { text: "Cookig", correct: false },
            { text: "Counting", correct: false },
        ]
    },
    {
        question: "Which of the following is a noun word?",
        answers: [
            { text: "Eating", correct: false },
            { text: "Car", correct: true },
            { text: "Cookig", correct: false },
            { text: "Counting", correct: false },
        ]
    },
    {
        question: "Which of the following is a noun word?",
        answers: [
            { text: "Eating", correct: false },
            { text: "Car", correct: true },
            { text: "Cookig", correct: false },
            { text: "Counting", correct: false },
        ]
    },
    {
        question: "Which of the following is a noun word?",
        answers: [
            { text: "Eating", correct: false },
            { text: "Car", correct: true },
            { text: "Cookig", correct: false },
            { text: "Counting", correct: false },
        ]
    },
    {
        question: "Which of the following is a noun word?",
        answers: [
            { text: "Eating", correct: false },
            { text: "Car", correct: true },
            { text: "Cookig", correct: false },
            { text: "Counting", correct: false },
        ]
    },
    {
        question: "Which of the following is a noun word?",
        answers: [
            { text: "Eating", correct: false },
            { text: "Car", correct: true },
            { text: "Cookig", correct: false },
            { text: "Counting", correct: false },
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
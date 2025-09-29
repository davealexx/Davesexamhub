


const questions = [
    {
        question: "What is 5 + 3?",
        answers: [
            { text: "6", correct: false },
            { text: "8", correct: true },
            { text: "9", correct: false },
            { text: "10", correct: false },
        ]
    },
    {
        question: "What is 10 - 4?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: true },
            { text: "7", correct: false },
            { text: "4", correct: false },
        ]
    },
    {
        question: "What is 3 × 4?",
        answers: [
            { text: "7", correct: false },
            { text: "10", correct: false },
            { text: "12", correct: true },
            { text: "14", correct: false },
        ]
    },
    {
        question: "What is 15 ÷ 3?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: false },
            { text: "5", correct: true },
            { text: "6", correct: false },
        ]
    },
    {
        question: "Which of these is an even number?",
        answers: [
            { text: "7", correct: false },
            { text: "11", correct: false },
            { text: "14", correct: true },
            { text: "19", correct: false },
        ]
    },
    {
        question: "Which of these is an odd number?",
        answers: [
            { text: "8", correct: false },
            { text: "12", correct: false },
            { text: "15", correct: true },
            { text: "20", correct: false },
        ]
    },
    {
        question: "Which of these is a fraction?",
        answers: [
            { text: "3/4", correct: true },
            { text: "12", correct: false },
            { text: "7", correct: false },
            { text: "15", correct: false },
        ]
    },
    {
        question: "Which of these is a rational number?",
        answers: [
            { text: "1/2", correct: true },
            { text: "5.123...", correct: false },
            { text: "π", correct: false },
            { text: "√3", correct: false },
        ]
    },
    {
        question: "What is 9 + 6?",
        answers: [
            { text: "14", correct: false },
            { text: "15", correct: true },
            { text: "16", correct: false },
            { text: "13", correct: false },
        ]
    },
    {
        question: "What is 20 - 9?",
        answers: [
            { text: "9", correct: false },
            { text: "10", correct: false },
            { text: "11", correct: true },
            { text: "12", correct: false },
        ]
    }
];



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const empty = document.querySelector('.empty');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    }
 function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from( answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
 }
 function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
      empty.innerHTML = `<a href="../exam.html" class="btn btn-primary" style="text-decoration: none;">Back to Exam</a>`
 }
 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
 }
 nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
    handleNextButton();
    } else{
        startQuiz();
    }
 });

startQuiz();

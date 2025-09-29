
const questions = [
  {
    question: "What is the unit of force?",
    answers: [
      { text: "Newton", correct: true },
      { text: "Joule", correct: false },
      { text: "Watt", correct: false },
      { text: "Pascal", correct: false }
    ]
  },
  {
    question: "What does a thermometer measure?",
    answers: [
      { text: "Speed", correct: false },
      { text: "Temperature", correct: true },
      { text: "Pressure", correct: false },
      { text: "Mass", correct: false }
    ]
  },
  {
    question: "Which of the following is a source of light?",
    answers: [
      { text: "Moon", correct: false },
      { text: "Sun", correct: true },
      { text: "Mirror", correct: false },
      { text: "Glass", correct: false }
    ]
  },
  {
    question: "What is the speed of light in vacuum?",
    answers: [
      { text: "3 × 10^8 m/s", correct: true },
      { text: "1.5 × 10^6 m/s", correct: false },
      { text: "3 × 10^6 m/s", correct: false },
      { text: "1 × 10^8 m/s", correct: false }
    ]
  },
  {
    question: "Which device is used to measure electric current?",
    answers: [
      { text: "Voltmeter", correct: false },
      { text: "Ammeter", correct: true },
      { text: "Barometer", correct: false },
      { text: "Thermometer", correct: false }
    ]
  },
  {
    question: "What is the unit of energy?",
    answers: [
      { text: "Watt", correct: false },
      { text: "Joule", correct: true },
      { text: "Newton", correct: false },
      { text: "Ohm", correct: false }
    ]
  },
  {
    question: "Which of these is a renewable source of energy?",
    answers: [
      { text: "Coal", correct: false },
      { text: "Petrol", correct: false },
      { text: "Solar", correct: true },
      { text: "Diesel", correct: false }
    ]
  },
  {
    question: "What type of mirror is used in a car’s rear-view mirror?",
    answers: [
      { text: "Plane mirror", correct: false },
      { text: "Concave mirror", correct: false },
      { text: "Convex mirror", correct: true },
      { text: "None of the above", correct: false }
    ]
  },
  {
    question: "What is the SI unit of power?",
    answers: [
      { text: "Newton", correct: false },
      { text: "Pascal", correct: false },
      { text: "Watt", correct: true },
      { text: "Joule", correct: false }
    ]
  },
  {
    question: "Which of these travels the fastest?",
    answers: [
      { text: "Sound", correct: false },
      { text: "Water waves", correct: false },
      { text: "Light", correct: true },
      { text: "Air", correct: false }
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

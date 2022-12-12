const questions = [
    {
        question: "what is love",
        correct: "baby",
        incorrects: ["don't", "hurt", "me"],
        type: "multiple"
    }
];

let qNumber = 0;
let points = 0;


function nextQuestion() {
    checkAnswer();
    qNumber++;
    window.location.href = `http://localhost:5500/BW/question${qNumber}.html`
}

/* 
function renderQuestion(n) {

}

function checkAnswer() {

}

function startBenchmark() {

}

function renderWelcome() {

}


function renderResult() {

}

function renderFeedback() {
    window.location.href = "http://localhost:5500/BW/feedback.html";
}


window.onload = function() {
    renderWelcome();
} */
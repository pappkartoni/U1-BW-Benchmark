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

function startBenchmark() {

}

function nextQuestion() {
    checkAnswer();
    qNumber++;
}

function renderWelcome() {

}

function renderQuestion(n) {

}

function renderResult() {

}

function renderFeedback() {
    window.location.href = "http://localhost:5500/BW/feedback.html";
}

function checkAnswer() {

}

window.onload = function() {
    renderWelcome();
}
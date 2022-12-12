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

function hoverStars() {

}

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


function activateRating() {
    let stars = document.querySelectorAll(".stars svg");
    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener("click", function() {
            for (let j = 0; j < stars.length; j++) {
                stars[j].classList.remove("star-active");
            }
            for (let j = i; j >= 0; j--) {
                stars[j].classList.toggle("star-active")
            }
        })
    }
}

window.onload = function() {
    renderWelcome();
    activateRating();
}
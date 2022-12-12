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


// Set the number of seconds for the timer
const timerLength = 60;

// Set the starting time for the timer
let timeLeft = timerLength;

// Create a function to start the timer
function startTimer() {
  // Use setInterval to count down the seconds
  const timerInterval = setInterval(function() {
    // Decrement the time left by 1 second
    timeLeft--;

    // Update the time displayed on the page
    document.getElementById("timer").innerHTML = timeLeft + " seconds remaining";

    // If the timer reaches 0, stop the interval and show a "Time's up" message
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").innerHTML = "Time's up!";
    }
  }, 1000); // 1000 milliseconds = 1 second
}

startTimer();//Calling function

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
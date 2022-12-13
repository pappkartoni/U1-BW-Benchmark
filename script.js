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
let rating = 0;


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

function renderQuestion(n) {

}

function checkAnswer() {

}

function startBenchmark() {
    let check = document.getElementById("check");
        if (check.checked) {
            renderQuestion(0);
        } else {
            alert("Please promise us to be honest, honey!")
        }
    }

function renderWelcome() {

}


function renderResult() {

}

function renderFeedback() {
    window.location.href = "./feedback.html";
}

function renderStars() {
    let stars = document.getElementById("stars");
    for (let i = 1; i <= 10; i++) {
        let star = document.createElement("div");
        star.innerHTML = `<svg star-rating="${i}" width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.2044 1.55551C22.6143 0.569963 24.0104 0.569964 24.4203 1.55552L29.9874 14.9402C30.1602 15.3557 30.5509 15.6396 30.9994 15.6756L45.4494 16.834C46.5134 16.9193 46.9448 18.2471 46.1341 18.9415L35.1248 28.3722C34.7831 28.6649 34.6338 29.1242 34.7382 29.5619L38.1018 43.6626C38.3494 44.7009 37.2199 45.5215 36.309 44.9651L23.9379 37.4089C23.5538 37.1743 23.0709 37.1743 22.6868 37.4089L10.3157 44.9651C9.40478 45.5215 8.27528 44.7009 8.52295 43.6626L11.8865 29.5619C11.9909 29.1242 11.8416 28.6649 11.4999 28.3722L0.490575 18.9415C-0.320069 18.2471 0.111362 16.9193 1.17535 16.834L15.6253 15.6756C16.0738 15.6396 16.4645 15.3557 16.6374 14.9402L22.2044 1.55551Z" 
                            fill="#121c68"/> 
                        </svg>`; // #0B113B | 1e278a
        star.classList.add("il-ctr");
        star.addEventListener("click", clickStar);
        star.addEventListener("mouseover", hoverStar);
        star.addEventListener("mouseleave", leaveStar);
        stars.appendChild(star);
    }
}

function renderRating(rating) {
    let stars = document.getElementById("stars");

    for (let i = rating; i < stars.children.length; i++) {
        stars.children[i].classList.remove("star-active")
    }
    for (let i = 0; i < rating; i++) {
        stars.children[i].classList.add("star-active")
    }
}

function clickStar(event) {
    let stars = document.getElementById("stars");
    let star = event.target;
    let starNo;

    if (star.tagName === "path") {
        starNo = parseInt(star.parentNode.getAttribute("star-rating"));
    } else if (star.tagName === "svg") {
        starNo = parseInt(star.getAttribute("star-rating"));
    }
    rating = (starNo === rating) ? 0 : starNo;
    renderRating(rating);
}

function hoverStar(event) {
    let stars = document.getElementById("stars");
    let star = event.target;
    let starNo = parseInt(star.getAttribute("star-rating"));
    renderRating(starNo);
}

function leaveStar(event) {
    renderRating(rating);
}

window.onload = function() {
    renderWelcome();
    renderStars();
}
const questions = [
    {
        question: "If you type the following code in the console window, what result will you get? 3 > 2 > 1 === false;",
        correct: "True",
        incorrects: ["False"],
        type: "multiple",
        time: 20
    },
    
    { 
        question: "JavaScript is a ___ -side programming language.",
        correct: "Both",
        incorrects: ["Client", "Sever", "None"],
        type: "multiple",
        time: 20
    },
];

let qNumber = 0;
let points = 0;
let rating = 0;
let selectedAnswer = null;

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

function renderQuestion() {
        let question = questions[qNumber];        
        let inner = document.querySelector('.inner');
        inner.innerHTML = "";
        selectedAnswer = null;

        let h1 = document.createElement("h1");
        h1.innerText = question.question + points;
        inner.appendChild(h1);
        
        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("btn-container");
        inner.appendChild(buttonContainer);

        let answers = shuffleArray([question.correct].concat(question.incorrects));

        for (let i = 0; i < answers.length; i++) {
            let answer = answers[i];
            let btn = document.createElement("button");

            btn.classList.add("answer-btn", "unselected");
            btn.setAttribute("id", i);
            btn.innerText = answer;
            btn.addEventListener("click", selectAnswer);
            buttonContainer.appendChild(btn);
        }
        qNumber++;

} 

function checkAnswer() {
    let answer = selectedAnswer; // we have to actually get the selected answer
    let correctOne = questions[qNumber].correct;
    if (answer === correctOne) {
        points++
    }
    renderQuestion()
}

function selectAnswer(event) { // TODO
    selectedAnswer = event.target.innerText;
    event.target.classList.toggle("selected");
    event.target.classList.toggle("unselected");
}

function renderButtons() {
    
    let buttons = questions[0];

    let inner = document.querySelector('.inner');

    inner.innerHTML = '';

    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttons');

    inner.appendChild(buttonDiv);

    

      


}







function checkAnswer() {
    if (document.getElementById('')) {
        
    }

}

function startBenchmark() {
    let check = document.getElementById("check");
        if (check.checked) {
            window.location.href = "./questions.html"
            window.onload = renderQuestion();
        } else {
            alert("Please promise us to be honest, honey!")
        }
    }

function renderWelcome() {

}

// Global var of result
let percentageRight = 100 * (points/questions.length)
let percentageWrong = 100 - percentageRight

//pie chart / donut chart
let pieChart = document.querySelector("#pie-chart")
pieChart.classList.add("pie-chart")
pieChart.style = `--p:${percentageWrong};`
 
function renderResult() {
   
    // correct div
    let correctPercentageNode = document.querySelector("#correctPercentage")
    correctPercentageNode.innerText = "Correct"
 
    let correctPercentage = document.createElement("div")
    correctPercentage.innerText = `${percentageRight} %`
    correctPercentageNode.appendChild(correctPercentage)
 
    let questionsCorrect = document.createElement("div")
    questionsCorrect.innerText = `${points}/${questions.length} questions`
    correctPercentageNode.appendChild(questionsCorrect)
 
    // wrong div
    let wrongPercentageNode = document.querySelector("#wrongPercentage")
    wrongPercentageNode.innerText = "Wrong"
 
    let wrongPercentage = document.createElement("div")
    wrongPercentage.innerText = `${percentageWrong} %`
    wrongPercentageNode.appendChild(wrongPercentage)
   
    let questionsWrong = document.createElement("div")
    questionsWrong.innerText = `${questions.length - points}/${questions.length} questions`
    wrongPercentageNode.appendChild(questionsWrong)
   
    //result statement display pass or fail
    let resultStatementNode = document.querySelector(".resultStatement")
    let resultStatement = document.createElement("p")
    resultStatement.innerText = ""
    resultStatementNode.appendChild(resultStatement)
 

//  having problem to construct the if statement into the div
    if (percentageRight >= 60) {
        console.log("Congratulations, you passed the exam! We'll send you a certificate in a few minutes. Check your email (including promotions and spam folder)")
    } else {
        console.log("Oh no! Unfortunately you didn't pass this one.")
    }
 
}
console.log(renderResult())


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

function shuffleArray(arr) { // i reused this from yesterday
    for (let i=0;i<arr.length-1; i++) {
        let j = Math.floor(Math.random() * (arr.length - i)) + i;
        let swp = arr[i];
        arr[i] = arr[j];
        arr[j] = swp;
    }

    return arr;
}

window.onload = function() {
    renderWelcome();
    renderStars();
}




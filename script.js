const questions = [
    {
        question: "If you type the following code in the console window, what result will you get? 3 > 2 > 1 === false;",
        correct: "True",
        incorrects: ["False"],
        type: "multiple",
        time: 10
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
let timeout = false;

function startTimer() {
    // Set the number of seconds for the timer
    const timerLength = 60;

    // Set the starting time for the timer
    let timeLeft = timerLength;
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
        timeout = false;

        let h3 = document.createElement("h3");
        h3.innerText = question.question + points;
        inner.appendChild(h3);
        
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

        let nextButton = document.createElement("button");
        nextButton.classList.add("info-btn");
        nextButton.innerText = "NEXT QUESTION";
        nextButton.onclick = checkAnswer;
        inner.appendChild(nextButton);

        let footer = document.createElement("div");
        footer.classList.add("qtn-footer");
        footer.innerHTML = `QUESTION ${qNumber+1}<span> / ${questions.length}</span>`
        inner.appendChild(footer);
        renderTimer();
} 

function checkAnswer() {
    let selected = document.querySelector(".selected");
    if (selected !== null || timeout) {
        let answer = selected ? selected.innerText : null;
        let correctOne = questions[qNumber].correct;
        if (answer === correctOne) {
            points++
        }
        if (qNumber >= questions.length) {
            renderResult();
        } else {
            qNumber++;
            renderQuestion();
        }
    }
}

function selectAnswer(event) { // TODO
    selectedAnswer = event.target.innerText;
    let buttons = document.getElementsByClassName("answer-btn");
    for (let b of buttons) {
        b.classList.remove("selected");
    }
    event.target.classList.add("selected");
}

function startBenchmark() {
    let check = document.getElementById("check");
        if (check.checked) {
            document.querySelector(".inner").classList.remove("flt-left");
            renderQuestion();
        } else {
            alert("Please promise us to be honest, honey!")
        }
    }

//RESULT PAGE
function renderResult(){
    let inner = document.querySelector('.inner');
    inner.innerHTML = "";

// creating header 
    let headerdiv = document.createElement("div");
    headerdiv.classList.add("header");
    inner.appendChild(headerdiv)

    let resultText = document.createElement("h2")
    resultText.innerText = "Results"
    resultText.classList.add("result")
    headerdiv.appendChild(resultText)
    
    let summary = document.createElement("h3")
    summary.innerText = "The summary of your answers:"
    headerdiv.appendChild(summary)

// creating middle box
    let middlebox = document.createElement("div")
    middlebox.classList.add ("middle-box")
    inner.appendChild(middlebox)

// creating result body
    let resultBody = document.createElement("div")
    resultBody.classList.add("resultbody")
    middlebox.appendChild(resultBody)

// creating div il-ctr, percantages and chart
    let percentageRight = (100 * (points/questions.length)).toFixed(1)
    let percentageWrong = (100 - percentageRight).toFixed(1)

// correct div
    let ilCtr = document.createElement("div")
    ilCtr.classList.add("il-ctr")
    resultBody.appendChild(ilCtr)
    
    let correctP = document.createElement("div")
    correctP.setAttribute("id","correctPercentage")
    ilCtr.appendChild(correctP)

    let correctPercentageNode = document.querySelector("#correctPercentage")
    correctPercentageNode.innerText = "Correct"

    let correctPercentage = document.createElement("div")
    correctPercentage.innerText = `${percentageRight} %`
    correctPercentageNode.appendChild(correctPercentage)

    let questionsCorrect = document.createElement("div")
    questionsCorrect.classList.add("questionsCorrect")
    questionsCorrect.innerText = `${points}/${questions.length} questions`
    correctPercentageNode.appendChild(questionsCorrect)
    
//pie chart / donut chart

    let pieChartDiv = document.createElement("div")
    pieChartDiv.setAttribute("id","pie-chart")
    resultBody.appendChild(pieChartDiv)

    let pieChart = document.querySelector("#pie-chart")
    pieChart.classList.add("pie-chart")
    pieChart.style = `--p:${percentageWrong};`

//result statement display pass or fail

    let statement = document.createElement("div")
    statement.classList.add("resultStatement")
    resultBody.appendChild(statement)

    let resultStatementNode = document.querySelector(".resultStatement")
    let resultStatement = document.createElement("p")
    resultStatement.innerText = ""
    resultStatementNode.appendChild(resultStatement)
 

    if (percentageRight >= 60) {
        resultStatement.innerText = "Congratulations! You passed the exam! We'll send you a certificate in a few minutes. Check your email (including promotions and spam folder)"
    } else {
        resultStatement.innerText = "Oh no! Unfortunately you didn't pass this one."
    }

// wrong div

    let ilCtr2 = document.createElement("div")
    ilCtr2.classList.add("il-ctr")
    resultBody.appendChild(ilCtr2)

    let wrongP = document.createElement("div")
    wrongP.setAttribute("id","wrongPercentage")
    ilCtr2.appendChild(wrongP)

    let wrongPercentageNode = document.querySelector("#wrongPercentage")
    wrongPercentageNode.innerText = "Wrong"
 
    let wrongPercentage = document.createElement("div")
    wrongPercentage.innerText = `${percentageWrong} %`
    wrongPercentageNode.appendChild(wrongPercentage)
   
    let questionsWrong = document.createElement("div")
    questionsWrong.classList.add("questionsWrong")
    questionsWrong.innerText = `${questions.length - points}/${questions.length} questions`
    wrongPercentageNode.appendChild(questionsWrong)
   

// creating rate-us button
    let btnDiv = document.createElement("div")
    inner.appendChild(btnDiv)

    let rateUsBtn = document.createElement("button")
    rateUsBtn.classList.add("rate-us-btn");
    rateUsBtn.innerText = ("RATE US")
    btnDiv.appendChild(rateUsBtn)
    rateUsBtn.onclick = function() {
        renderFeedback()
    }


}

function renderWelcome() {
    let inner = document.querySelector(".inner");
    inner.innerHTML = "";
    inner.classList.add("flt-left");
    let h1 = document.createElement("h1");
    h1.innerHTML = "Welcome to <span>your exam</span>";
    inner.appendChild(h1);
    let instructions = document.createElement("div");
    let h2 = document.createElement("h2");
    h2.innerText = "Instructions";
    instructions.appendChild(h2);
    let p = document.createElement("p");
    p.classList.add("inl");
    p.innerText = "We don't expect most engineers to know the answers to all of these questions, so don't worry if you're unsure of a few of them."
    instructions.appendChild(p);
    inner.appendChild(instructions);
    let bullets = document.createElement("div");
    bullets.classList.add("bullet-points");
    let ul = document.createElement("ul");
    
    let li1 = document.createElement("li");
    li1.innerHTML ="Each question is <span>timed</span> and can only be <span>answered once</span>."
    ul.appendChild(li1);
    let li2 = document.createElement("li");
    li2.innerHTML = "Changing browser tab or opening other windows will invalidate the question.";
    ul.appendChild(li2);
    let li3 = document.createElement("li");
    li3.innerHTML = "This exam will take approx. <span>0-5 minutes.</span>";
    ul.appendChild(li3);
    bullets.appendChild(ul);
    inner.appendChild(bullets)

    let checkbar = document.createElement("div");
    checkbar.classList.add("checkbar");
    let ctr1 = document.createElement("div");
    ctr1.classList.add("il-ctr");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("id", "check");
    ctr1.appendChild(checkbox);
    let label = document.createElement("label");
    label.innerText = "I promise to answer myself without help from anyone";
    ctr1.appendChild(label);
    checkbar.appendChild(ctr1);
    let ctr2 = document.createElement("div");
    ctr2.classList.add("il-ctr");
    let button = document.createElement("button");
    button.classList.add("info-btn");
    button.onclick = startBenchmark;
    button.innerText = "PROCEED";
    ctr2.appendChild(button);
    checkbar.appendChild(ctr2);
    inner.appendChild(checkbar);
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

const COLOR_CODES = {
    info: {
        color: "blue"
    },
    alert: {
        color: "pink",
        threshold: 5
    }
};
  
let remainingPathColor = COLOR_CODES.info.color;

function renderTimer() {
    let inner = document.querySelector(".inner");
    let timeLimit = questions[qNumber].time;
    let timePassed = 0;
    let timeLeft = timeLimit;
    let timerInterval = null;

    let timerdiv = document.createElement("div");
    timerdiv.classList.add("base-timer");
    inner.appendChild(timerdiv);
    timerdiv.innerHTML = `  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <g class="base-timer__circle">
                                    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                                    <path
                                    id="base-timer-path-remaining"
                                    class="base-timer__path-remaining ${remainingPathColor}"
                                    d="
                                      M 50, 50
                                      m -45, 0
                                      a 45,45 0 1,0 90,0
                                      a 45,45 0 1,0 -90,0
                                    "
                                  ></path>
                                </g>
                            </svg>
                            <span id="base-timer-label" class="base-timer__label">
                            ${timeLeft}
                            </span>`;
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = timeLimit - timePassed;
        setCircleDasharray(timeLeft, timeLimit);
        document.getElementById("base-timer-label").innerText = timeLeft;
        setRingColor(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timeout = true;
            let buttons = document.getElementsByClassName("answer-btn");
            for (let b of buttons) {
                b.disabled = true; // no hover as well?
            }
        }
    }, 1000);
}

function calculateTimeFraction(timeLeft, timeLimit) {
    const rawTimeFraction = (timeLeft) / (timeLimit);
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
}

function setCircleDasharray(timeLeft, timeLimit) {
    const circleDasharray = `${(calculateTimeFraction(timeLeft, timeLimit) * 283).toFixed(0)} 283`;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
  }

function setRingColor(timeLeft) {
    const { alert, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
          .getElementById("base-timer-path-remaining")
          .classList.add(alert.color);
          document
          .getElementById("base-timer-path-remaining")
          .classList.remove(info.color);
    }    
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
}

//remember to change back to renderWelcome




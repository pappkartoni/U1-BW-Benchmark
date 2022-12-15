const questions1 = [
    {
        question: "Which built-in method removes the last element from an array and returns that element?",
        correct: "pop()",
        incorrects: ["last()", "get()", "None of the above"],
        time: 30
    },
    
    { 
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        correct: "All of the above",
        incorrects: ["document.write()", "console.log()", "window.alert()"],
        time: 30
    },

    { 
        question: "Which tag do we use in HTML for inserting a line-break?",
        correct: "<br>",
        incorrects: ["<pre>", "<b>", "<a>"],
        time: 30
    },

    { 
        question: "Which property sets the actual amount of spacing between the various letters?",
        correct: "letter-spacing",
        incorrects: ["letter-space", "space", "line-height"],
        time: 30
    },

    { 
        question: "Look at the snippets given below and check the one in which the variable “a” isn’t equal to “NULL”.",
        correct: "if(a!==null)",
        incorrects: ["if (a!)", "if(a!=null)", "if(a!null)"],
        time: 60
    },

    { 
        question: "Which tag is used in HTML5 for the initialization of the document type?",
        correct: "<!DOCTYPE html>",
        incorrects: ["<Doctype>", "<Doctype HTML>", "<\Doctype html>"],
        time: 30
    },
];
const doomquiz = [
    {
        category: "DOOM",
        type: "multiple",
        difficulty: "medium",
        question: "What is MF Doom's real name?",
        correct: "Daniel Dumile",
        incorrects: ["Dwayne Michael Carter Jr.", "Shawn Carter", "Otis Jackson Jr."],
        time: 10,
      },
      {
        category: "DOOM",
        type: "boolean",
        difficulty: "easy",
        question: "MF Doom is still alive.",
        correct: "False",
        incorrects: ["True"],
        time: 10,
      },
      {
        category: "DOOM",
        type: "multiple",
        difficulty: "medium",
        question: "When did MF Doom release his first solo studio album 'Operation Doomsday'?",
        correct: "1999",
        incorrects: ["1997", "1998", "2000"],
        time: 40,
      },
      {
        category: "DOOM",
        type: "multiple",
        difficulty: "easy",
        question: "With whom did MF Doom collaborate on the 2004 LP 'Madvillainy'?",
        correct: "Madlib",
        incorrects: ["Bishop Nehru", "Czarface", "Danny Brown"],
        time: 30,
      },
      {
        category: "DOOM",
        type: "multiple",
        difficulty: "medium",
        question: "Which of these is NOT a pseudonym of MF Doom?",
        correct: "Quasimoto",
        incorrects: ["Viktor Vaughn", "Zev Love X", "King Geedorah"],
        time: 45,
      },
      {
        category: "DOOM",
        type: "boolean",
        difficulty: "easy",
        question: "Has MF Doom ever been featured on a Gorillaz album?",
        correct: "True",
        incorrects: ["False"],
        time: 10,
      },
      {
        category: "DOOM",
        type: "multiple",
        difficulty: "medium",
        question: "What was the name of the group MF Doom formed with his brother in 1988?",
        correct: "KMD",
        incorrects: ["RZA", "CREAM", "WTF"],
        time: 30,
      },
      {
        category: "DOOM",
        type: "multiple",
        difficulty: "hard",
        question: "What was the title of their only commercially released album?",
        correct: "Mr. Hood",
        incorrects: ["Young, Broke & Infamous", "Reasonabable Doubt", "Playtime is over"],
        time: 45,
      },
      {
        category: "DOOM",
        type: "multiple",
        difficulty: "hard",
        question: "MF Doom's signature metal mask is based on a prop of which movie?",
        correct: "Gladiator",
        incorrects: ["300", "Troy", "Spartacus"],
        time: 45,
      },
];

let qNumber = 0;
let points = 0;
let rating = 0;
let selectedAnswer = null;
let timeout = false;
let timerInterval = null;
let timeLimit = 0;
let timePassed = 0;
let timeLeft = 0;
let questions = questions1;

function renderQuestion() {
    let question = questions[qNumber];        
    let inner = document.querySelector('.inner');
    selectedAnswer = null;
    timeout = false;
    timeLimit = question.time;
    timePassed = 0;
    timeLeft = timeLimit;
    inner.innerHTML = "";
    let baseTimer = document.createElement("div");
    baseTimer.classList.add("base-timer");
    // inner.appendChild(baseTimer);
    document.querySelector(".logo").appendChild(baseTimer);
    renderTimer();
    
    let h3 = document.createElement("h3");
    h3.innerText = question.question;
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

    let nextBox = document.createElement("div");
    nextBox.classList.add("next-box");
    inner.appendChild(nextBox);
    let nextButton = document.createElement("button");
    nextButton.classList.add("info-btn");
    nextButton.innerText = "NEXT QUESTION";
    nextButton.onclick = checkAnswer;
    nextBox.appendChild(nextButton);

    let footer = document.createElement("div");
    footer.classList.add("qtn-footer");
    footer.innerHTML = `QUESTION ${qNumber+1}<span> / ${questions.length}</span>`
    inner.appendChild(footer);

    startTimer();
} 

function checkAnswer() {
    clearInterval(timerInterval);
    let selected = document.querySelector(".selected");

    if(!timeout) {
        if (selected !== null) {
            let answer = selected ? selected.innerText : null;
            let correctOne = questions[qNumber].correct;
            if (answer === correctOne) {
                points++
            }
        }
    }
    if (qNumber >= questions.length - 1) {
        document.querySelector(".base-timer").remove();
        renderResult();
    } else {
        qNumber++;

        renderQuestion();
    }
}

function selectAnswer(event) {
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
/*     let headerdiv = document.createElement("div");
    headerdiv.classList.add("header");
    // inner.appendChild(headerdiv) */

    let resultText = document.createElement("h3")
    resultText.innerText = "Results"
    resultText.classList.add("result")
    inner.appendChild(resultText)
    
    let summary = document.createElement("p")
    summary.innerText = "The summary of your answers:"
    summary.classList.add("summary-of-answer")
    inner.appendChild(summary)

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
    correctPercentage.classList.add("percentage")
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
    pieChartDiv.appendChild(statement)

    let resultStatementNode = document.querySelector(".resultStatement")
    let resultStatement = document.createElement("p")
    resultStatement.innerText = ""
    resultStatementNode.appendChild(resultStatement)
    // passBox
    let passedText = document.createElement ("div")
    let congratz = document.createElement ("p")
    congratz.innerText = "Congratulations!"
    congratz.classList.add("congratz-statement")

    let passedExam = document.createElement ("p")
    passedExam.innerText = "You passed the exam!!"
    passedExam.classList.add("passedExamStatement")

    let sendCert = document.createElement ("p")
    sendCert.innerText = "We'll send you a certificate \n in a few minutes.\n Check your email (including promotions and spam folder)"
    sendCert.classList.add("sendCert-Statement")

    passedText.appendChild(congratz)
    passedText.appendChild(passedExam)
    passedText.appendChild(sendCert)

    //failBox
    let failText = document.createElement ("div")
    let ohNo = document.createElement ("p")
    ohNo.innerText = "Oh no!"
    ohNo.classList.add("ohNo-Statement")

    let failedExam = document.createElement ("p")
    failedExam.innerText = "Unfortunately you didn't pass this one."
    failedExam.classList.add("failedExam-Statement")

    failText.appendChild(ohNo)
    failText.appendChild(failedExam)

    if (percentageRight >= 60) {
        resultStatement.appendChild(passedText)
    } else {
        resultStatement.appendChild(failText)
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
    wrongPercentage.innerText = `${percentageWrong}%`
    wrongPercentage.classList.add("percentage")
    wrongPercentageNode.appendChild(wrongPercentage)
   
    let questionsWrong = document.createElement("div")
    questionsWrong.classList.add("questionsWrong")
    questionsWrong.innerText = `${questions.length - points}/${questions.length} questions`
    wrongPercentageNode.appendChild(questionsWrong)
   

// creating rate-us button
    let btnDiv = document.createElement("div")
    inner.appendChild(btnDiv)

    let rateUsBtn = document.createElement("button")
    // rateUsBtn.classList.add("rate-us-btn");
    rateUsBtn.setAttribute("id","rate-us-btn")
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
    label.htmlFor = "check";
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

function renderFeedback() {
    let inner = document.querySelector('.inner');
    inner.innerHTML = "";

    let h1 = document.createElement("h1");
    h1.innerText = "Tell us how it's going";
    inner.appendChild(h1);

    let p = document.createElement("p");
    p.innerText = "From 0 to 10, how likely are you to recommend EPICODE to a friend or a colleague?";
    inner.appendChild(p);


    let stars = document.createElement("div")
    stars.id = "stars";
    inner.appendChild(stars);
    renderStars();



    let commentBoxContainer = document.createElement("div");
    commentBoxContainer.classList.add("comment-box"); 

    let p1 = document.createElement("p");
    p1.innerText = "Leave us an open feedback about your experience so far";
    inner.appendChild(p1);

    let commentBox = document.createElement("input");
    commentBox.type = "text";
    commentBox.placeholder = "Write your comment here";
    inner.appendChild(commentBox);

    let infoButton = document.createElement('button');
    infoButton.classList.add('info-btn');
    infoButton.innerText ='MORE INFO';
    infoButton.onclick = function() {
        window.location.href='https://epicode.com';
    }
    inner.appendChild(infoButton);
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

const COLOR_CODES = { // clean this up to match our task
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
    let baseTimer = document.querySelector(".base-timer");
    baseTimer.innerHTML = `<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
    <path
    id="base-timer-path-remaining"
    stroke-dasharray="283"
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
    <div id="base-timer-label" class="base-timer__label">
        <p>SECONDS</p><p id="time-field">${timeLeft}<p><p>REMAINING</p>
    </div>
    `;
    
/*     let inner = document.querySelector(".inner");
    inner.innerHTML =        `<div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
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
    <span id="base-timer-label" class="base-timer__label">${timeLeft}</span>
  </div>
  `; */
}

function onTimesUp() {
    clearInterval(timerInterval);
    timeout = true;
    let buttons = document.getElementsByClassName("answer-btn");
    for (let b of buttons) {
        b.disabled = true; // no hover as well?
    }
    //checkAnswer();
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = timeLimit - timePassed;
      document.getElementById("time-field").innerHTML = timeLeft;
      setCircleDasharray();
      setRingColor(timeLeft);

      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
  }

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / timeLimit;
    console.log(rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction));
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
  }

function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * 283
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

function setRingColor(timeLeft) {
    const { alert, info } = COLOR_CODES;
    if (timeLeft <= 5) {
        document
          .getElementById("base-timer-path-remaining")
          .classList.add("pink");
          document
          .getElementById("base-timer-path-remaining")
          .classList.remove("blue");
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




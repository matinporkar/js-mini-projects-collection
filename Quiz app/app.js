const questions = [
    {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3,
    },
    {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    answer: 1,
    },
    {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Text Making Logic",
    ],
    answer: 0,
    }
];

let index = 0;
let score = 0;
let selected = null;
let timer;
let timeLeft = 15;

const questionBox = document.getElementById("question");
const optionsBox  = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const resultBox = document.getElementById("result");
const progressBar  = document.querySelector("#progress div");
const timeSpan = document.getElementById("time");
const start = document.getElementById("start");

function startTimer() {
    timeLeft = 15;
    timeSpan.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeSpan.textContent = timeLeft;

        if(timeLeft <=0) {
            clearInterval(timer);
            lockOptions();
            nextBtn.click();
        }
    },1000);
}

function loadProgress() {
    const percent = (index / questions.length) * 100;
    progressBar.style.width = percent + "%";
}

function loadQuestion() {

    loadProgress();
    startTimer();

    const q = questions[index];
    questionBox.innerHTML = q.question;

    optionsBox.innerHTML = "";
    selected = null;

    q.options.forEach((opt,i) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = opt;

        div.addEventListener("click",() => selectOption(i,div));
        optionsBox.appendChild(div);
    });
}

function selectOption(i,div) {
    selected = i;

    document.querySelectorAll(".option").forEach(o => {
        o.style.background = "#eee";
    });
    
    div.style.background = "#ccc";
}

function lockOptions() {
    const opts = document.querySelectorAll(".option");

    opts.forEach((opt,i) => {
        opt.style.pointerEvents = "none";

        if (i === questions[index].answer) 
            opt.classList.add("correct");
        else if (i === selected)
            opt.classList.add("wrong");
    });
}

nextBtn.addEventListener("click", () => {
    clearInterval(timer);
    lockOptions();

    if (selected === questions[index].answer) score++;

    index++;

    setTimeout(() => {
        if (index < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    },1300);
});

function showResult() {
    questionBox.style.display = "none";
    optionsBox.style.display = "none";
    nextBtn.style.display = "none";
    progressBar.style.width = "100%";
  
    restartBtn.style.display = "block";
    resultBox.textContent = `Your Score : ${((score / questions.length) * 100).toFixed(0)} from 100`;
}

restartBtn.addEventListener("click",() => {
    index = 0;
    score = 0;
    questionBox.style.display = "";
    optionsBox.style.display = "";
    nextBtn.style.display = "";
    restartBtn.style.display = "none";
    resultBox.textContent = "";

    loadQuestion();
});

start.addEventListener("click",() => {
    nextBtn.style.display = "";
    start.style.display = "none";
    loadQuestion();
});
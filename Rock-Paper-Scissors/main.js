const choice = document.querySelectorAll(".choice");
const result = document.getElementById("result");
const score = document.getElementById("score");
const resetBtn = document.getElementById("reset");

let user;
let computerchoice;

let userScore = 0;
let computerScore = 0;

const computer = () => {
   const choices = ["rock","paper","scissors"];
   return choices[Math.floor(Math.random() * choice.length)];
};

const getWinner = (userchoice,computerchoice) => {
    if (userchoice == computerchoice) return "draw";
    if ((userchoice == "rock" && computerchoice == "scissors") || (userchoice == "paper" && computerchoice == "rock") || 
    (userchoice == "scissors" && computerchoice == "paper")) {
        return "user";
    }
    return "computer";
};

const winner = (winRes,user,computerchoice) => {
    if (winRes === "draw") {
        result.innerHTML = `Draw! You both chose ${user}`;
    }
    else if (winRes === "user") {
        userScore++;
        result.innerHTML = `You win! ${user} beats ${computerchoice}`;
        score.innerHTML = `You: ${userScore} | computer: ${computerScore}`;
    }
    else {
        computerScore++;
        result.innerHTML = `You lose! ${computerchoice} beats ${user}`;
        score.innerHTML = `You: ${userScore} | computer: ${computerScore}`;
    }
};

function reset () {
    userScore = 0;
    computerScore = 0;
    user = null;
    computerchoice = null;
    result.innerHTML = "Choose your move";
    score.innerHTML = "You: 0 | Computer: 0";
}

choice.forEach(choice => {
    choice.addEventListener("click", () => {
        user = choice.getAttribute("data-choice");
        computerchoice = computer();
        const winRes = getWinner(user,computerchoice);
        winner(winRes,user,computerchoice);
    })
});

resetBtn.addEventListener("click",reset);
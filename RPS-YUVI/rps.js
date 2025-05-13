let matchResult = document.getElementById("match-result");
let choice = document.getElementById("choice");
let score = document.getElementById("score");
let resetButton = document.getElementById("reset-button");
let autoplayButton = document.getElementById("autoplay-button");
const winSound = document.getElementById("win-sound")
const loseSound = document.getElementById("lose-sound")
const tieSound = document.getElementById("tie-sound")
const autoPlaySound = document.getElementById("auto-play-sound")
const stopPlaySound = document.getElementById("stop-play-sound")
const resetSound = document.getElementById("reset-sound")



const scoreData = JSON.parse(localStorage.getItem("scoreData")) || {
  Wins: 0,
  Loses: 0,
  Ties: 0,
};

function playgame(playerMove) {
  computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "scissors") {
      result = "You Win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You Lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  }

  matchResult.textContent = result;

  choice.innerHTML = `You Picked <img class="picked-moves" src="resources/images/${playerMove}-emoji.png"> Computer Picked <img class="picked-moves" src="resources/images/${computerMove}-emoji.png">`;

  if (result === "You Win") {
    winSound.play()
    scoreData.Wins += 1;
  } else if (result === "You Lose") {
    loseSound.play()
    scoreData.Loses += 1;
  } else if (result === "Tie") {
    tieSound.play()
    scoreData.Ties += 1;
  }

  resetButton.addEventListener("click", () => {
    resetSound.play()
    scoreData.Wins = 0;
    scoreData.Loses = 0;
    scoreData.Ties = 0;

    localStorage.setItem("scoreData", JSON.stringify(scoreData));
    choice.textContent = "";
    score.textContent = `Wins: ${scoreData.Wins}, Loses: ${scoreData.Loses}, Ties: ${scoreData.Ties}`;
  });

  score.textContent = `Wins:${scoreData.Wins}, Loses:${scoreData.Loses}, Ties:${scoreData.Ties}`;
  localStorage.setItem("scoreData", JSON.stringify(scoreData));
}

function pickComputerMove() {
  let computerMove = "";
  let randNum = Math.random();
  if (randNum >= 0 && randNum < 1 / 3) {
    computerMove = "rock";
  } else if (randNum >= 1 / 3 && randNum < 2 / 3) {
    computerMove = "paper";
  } else if (randNum >= 2 / 3 && randNum <= 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playgame(playerMove);
      autoplayButton.textContent = "Stop Play";
    }, 2000);
    isAutoPlaying = true;
    autoPlaySound.play()
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoplayButton.textContent = "Auto Play";
    stopPlaySound.play()
  }
}

document.body.addEventListener('keydown',(e)=>{
  if(e.key === 'r'){
    playgame('rock')
  }
  else if(e.key === 'p'){
    playgame('paper')
  }
  else if(e.key === 's'){
    playgame('scissors')
  }
})

const counter = document.querySelector("#counter");
const gameContainer = document.querySelector("#game");
const scissors = document.querySelector("#scissors");
const paper = document.querySelector("#paper");
const rock = document.querySelector("#rock");
const resultContainer = document.querySelector(".result");
const newRoundButton = resultContainer.querySelector(".play-again-button");

const buttons = [scissors, paper, rock];
const results = ["win", "lose", "draw"];
const actions = ["rock", "paper", "scissors"];

gameContainer.addEventListener("click", playGame);
newRoundButton.addEventListener("click", playNewRound);

function playGame(event) {
  let homeChoise = homeChoose();
  if (event.target.classList.contains("rock")) {
    removeOtherActions(rock);
    showPlayerChoise();
    rock.classList.add("player-choise");
    this.removeEventListener("click", playGame);
    setTimeout(() => {
      if (homeChoise === "paper") {
        showResultMessage("lose");
        showHomeChoise(paper);
        reduceScore();
      } else if (homeChoise === "scissors") {
        showResultMessage("win");
        showHomeChoise(scissors);
        increaseScore();
      } else {
        showHomeChoise(rock);
        showResultMessage("draw");
      }
    }, 1000);
  } else if (event.target.classList.contains("scissors")) {
    removeOtherActions(scissors);
    showPlayerChoise();
    scissors.classList.add("player-choise");
    this.removeEventListener("click", playGame);
    setTimeout(() => {
      if (homeChoise === "paper") {
        showHomeChoise(paper);
        showResultMessage("win");
        increaseScore();
      } else if (homeChoise === "rock") {
        showResultMessage("lose");
        showHomeChoise(rock);
        reduceScore();
      } else {
        showHomeChoise(scissors);
        showResultMessage("draw");
      }
    }, 1000);
  } else if (event.target.classList.contains("paper")) {
    removeOtherActions(paper);
    showPlayerChoise();
    paper.classList.add("player-choise");
    this.removeEventListener("click", playGame);
    setTimeout(() => {
      if (homeChoise === "scissors") {
        showResultMessage("lose");
        showHomeChoise(scissors);
        reduceScore();
      } else if (homeChoise === "rock") {
        showResultMessage("win");
        showHomeChoise(rock);
        increaseScore();
      } else {
        showHomeChoise(paper);
        showResultMessage("draw");
      }
    }, 1000);
  }
}

function playNewRound() {
  const home = gameContainer.querySelector(".home-choise");
  const messages = gameContainer.querySelectorAll(".text");
  const result = gameContainer.querySelector(".result-message");
  result.remove();
  messages.forEach((message) => {
    message.remove();
  });
  resultContainer.style.display = "none";
  home.remove();
  buttons.forEach((button) => {
    button.style.display = "flex";
    if (button.classList.contains("player-choise")) {
      button.classList.remove("player-choise");
    }
  });
  gameContainer.addEventListener("click", playGame);
}

function homeChoose() {
  const randomNumber = Math.floor(Math.random() * (2 - 0 + 1));
  return actions[randomNumber];
}

function increaseScore() {
  counter.innerHTML = +counter.innerHTML + 1;
}

function reduceScore() {
  counter.innerHTML = +counter.innerHTML - 1;
}

function removeOtherActions(target) {
  buttons.forEach((button) => {
    if (button !== target) {
      button.style.display = "none";
    }
  });
}

function showPlayerChoise() {
  const player = document.createElement("p");
  const home = document.createElement("p");
  player.innerHTML = `<p class="text player">You picked</p>`;
  home.innerHTML = `<p class="text home">The house picked</p>`;
  gameContainer.prepend(player);
  gameContainer.prepend(home);
}

function showHomeChoise(target) {
  const rockClone = rock.cloneNode(true);
  const paperClone = paper.cloneNode(true);
  const scissorsClone = scissors.cloneNode(true);
  if (target.classList.contains("rock")) {
    rockClone.style.display = "flex";
    rockClone.classList.add("home-choise");
    gameContainer.append(rockClone);
  } else if (target.classList.contains("paper")) {
    paperClone.style.display = "flex";
    paperClone.classList.add("home-choise");
    gameContainer.append(paperClone);
  } else {
    scissorsClone.style.display = "flex";
    scissorsClone.classList.add("home-choise");
    gameContainer.append(scissorsClone);
  }
}

function showResultMessage(message) {
  resultContainer.style.display = "block";
  let resultMessage = document.createElement("p");
  resultMessage.classList.add("result-message");
  results.forEach((result) => {
    if (result === message) {
      if (result === "draw") {
        resultMessage.innerHTML = `Draw`;
      }
    } else {
      resultMessage.innerHTML = `You ${message}`;
    }
  });

  resultContainer.prepend(resultMessage);
}

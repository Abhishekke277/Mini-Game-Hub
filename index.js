// ================= Carousel =================
let currentSlide = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

function moveSlide(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// ================= Tic Tac Toe =================
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameArea = document.querySelector(".game-area");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  gameArea.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msg.style.color = "red";
  showEndScreen();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations, Winner is ${winner}`;
  msg.style.color = "green";
  showEndScreen();
};

const showEndScreen = () => {
  disableBoxes();
  gameArea.classList.add("hide");
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// ================= Rock Paper Scissors =================
let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const msgrps = document.querySelector("#msgrps");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner1(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

const drawGame = () => {
  msgrps.innerText = "Game was Draw. Play again.";
  msgrps.style.backgroundColor = "#081b31";
};

const showWinner1 = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msgrps.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msgrps.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msgrps.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msgrps.style.backgroundColor = "red";
  }
};

// ================= Mind Game =================
let num1 = Math.floor(Math.random() * 100) + 1;
let num2 = Math.floor(Math.random() * 100) + 1;
document.getElementById("question").textContent = `What is ${num1} + ${num2}?`;

function checkMindGame() {
  const ans = parseInt(document.getElementById("answer").value);
  const result = document.getElementById("mindResult");

  if (ans === num1 + num2) {
    result.innerHTML = `🎉 Correct! Game Finished <br>
      <button onclick="startMindGame()">New Game</button>`;
    document.querySelector("#answer").disabled = true;
  } else {
    result.textContent = "❌ Wrong! Try again.";
  }
}

function startMindGame() {
  num1 = Math.floor(Math.random() * 100) + 1;
  num2 = Math.floor(Math.random() * 100) + 1;
  document.getElementById("question").textContent = `What is ${num1} + ${num2}?`;
  document.getElementById("mindResult").textContent = "";
  document.querySelector("#answer").value = "";
  document.querySelector("#answer").disabled = false;
}

// ================= Number Guessing =================
let secret = Math.floor(Math.random() * 20) + 1;

function checkGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  let res = "";

  if (guess === secret) {
    res = `🎉 Correct! Game Finished <br>
      <button onclick="startGuess()">New Game</button>`;
    document.querySelector("#guessInput").disabled = true;
  } else if (guess > secret) {
    res = "Too High!";
  } else {
    res = "Too Low!";
  }

  document.getElementById("guessResult").innerHTML = res;
}

function startGuess() {
  secret = Math.floor(Math.random() * 20) + 1;
  document.getElementById("guessResult").textContent = "";
  document.querySelector("#guessInput").value = "";
  document.querySelector("#guessInput").disabled = false;
}

// ================= Memory Game =================
const gameContainer = document.getElementById("game");
const emojis = [
  "🍎","🍎","🍌","🍌","🍇","🍇","🍊","🍊",
  "🍒","🍒","🍉","🍉","🍍","🍍","🥝","🥝",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffled = shuffle(emojis.slice());
let firstCard = null,
  secondCard = null,
  lockBoard = false;

function createBoard() {
  shuffled.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.innerHTML = "";
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flipped");
  this.innerHTML = this.dataset.emoji;
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetTurn();

    // ✅ Check if all matched
   if (document.querySelectorAll(".card.matched").length === emojis.length) {
  gameContainer.innerHTML = `
    <div class="game-over">
      <h2>Game finished🎉</h2>
      <button onclick="restartMemory()" class="new-btn">New Game</button>
    </div>
  `;
}

  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.innerHTML = "";
      secondCard.innerHTML = "";
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartMemory() {
  gameContainer.innerHTML = "";
  shuffled = shuffle(emojis.slice());
  createBoard();
}

createBoard();

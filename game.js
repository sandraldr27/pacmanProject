// DOM Screens
const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");
const gameOverScreen = document.getElementById("game-over-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const music = document.getElementById("bg-music");

// Events Buttons
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  music.play();
  startGame();
});

restartBtn.addEventListener("click", () => {
  gameOverScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  resetGame();
  music.play();
});

function showGameOver() {
  gameContainer.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
  music.pause();
  music.currentTime = 0;
}

const board = document.getElementById("game-board");
const width = 20;
const cells = [];
let pacmanPosition = 210;
let ghostPosition = 190;

const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,
  1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,
  1,0,1,0,1,0,1,0,1,1,0,1,0,1,1,1,0,1,0,1,
  1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,
  1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,
  1,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,
  1,1,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,
  1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,
  1,0,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,
  1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,
  1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,1,
  1,0,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,
  1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,
  1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

let score = 0;
let lives = 3;

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");

function updateScore(points) {
  score += points;
  scoreDisplay.textContent = score;
}

function loseLife() {
  lives--;
  livesDisplay.textContent = lives;
  if (lives === 0) {
    alert("¡Game Over! 😵");
    location.reload();
  } else {
    resetPositions();
  }
}

function resetPositions() {
  cells[pacmanPosition].classList.remove("pacman");
  cells[ghostPosition].classList.remove("ghost");
  pacmanPosition = 210;
  ghostPosition = 190;
  cells[pacmanPosition].classList.add("pacman");
  cells[ghostPosition].classList.add("ghost");
}

function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (layout[i] === 1) {
      cell.classList.add("wall");
    } else {
      cell.classList.add("dot");
    }
    board.appendChild(cell);
    cells.push(cell);
  }
  cells[pacmanPosition].classList.remove("dot");
  cells[pacmanPosition].classList.add("pacman");
  cells[ghostPosition].classList.add("ghost");
}

function movePacman(e) {
  cells[pacmanPosition].classList.remove("pacman");

  switch (e.key) {
    case "ArrowLeft":
      if (pacmanPosition % width !== 0 && layout[pacmanPosition - 1] !== 1)
        pacmanPosition -= 1;
      break;
    case "ArrowRight":
      if (pacmanPosition % width < width - 1 && layout[pacmanPosition + 1] !== 1)
        pacmanPosition += 1;
      break;
    case "ArrowUp":
      if (pacmanPosition - width >= 0 && layout[pacmanPosition - width] !== 1)
        pacmanPosition -= width;
      break;
    case "ArrowDown":
      if (pacmanPosition + width < layout.length && layout[pacmanPosition + width] !== 1)
        pacmanPosition += width;
      break;
  }

  if (cells[pacmanPosition].classList.contains("dot")) {
    cells[pacmanPosition].classList.remove("dot");
    updateScore(10);
  }

  cells[pacmanPosition].classList.add("pacman");

  if (pacmanPosition === ghostPosition) {
    loseLife();
  }

  if (document.querySelectorAll(".dot").length === 0) {
    alert("¡Has ganado! 🎉");
    location.reload();
  }
}

function moveGhost() {
  const directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];
  let nextPos = ghostPosition + direction;

  if (layout[nextPos] !== 1) {
    cells[ghostPosition].classList.remove("ghost");
    ghostPosition = nextPos;
    cells[ghostPosition].classList.add("ghost");
  }
}

document.addEventListener("keydown", movePacman);

createBoard();
setInterval(moveGhost, 500);


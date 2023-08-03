let $playArea = document.querySelector(".play-area");
let $activeBodyPart = document.querySelectorAll(".active-body-part");
let $BodyPart = document.querySelectorAll(".body-part");
let $playBtn = document.querySelector(".play-btn");

$activeBodyPart = Array.from($activeBodyPart);

let intervalId = null;
let currentDirection = "right";
let bodyPartHTMLcode = "";
let pause = null;
let speed = 300;
let score = 0;

let bodyPartPosition = {};

let snakePositions = [
   {
      x: 12,
      y: 12,
   },
];

//Interval nf
function interval(axis, boolean) {
   snakeMove(axis, boolean);
   intervalId = setInterval(function () {
      snakeMove(axis, boolean);
   }, speed);
}

//Random fn
function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

//Start game fn
function startGame() {
   $playBtn.classList.add("d-none");

   bodyPartGenerator();

   intervalId = setInterval(function () {
      snakeMove("x", true);
   }, speed);
}

// Snake move fn
function snakeMove(axis, positionModifier) {
   snakePositions.unshift({ ...snakePositions[0] });

   positionModifier
      ? (snakePositions[0][axis] += 1)
      : (snakePositions[0][axis] -= 1);

   checkIfCollision();

   if (
      bodyPartPosition.x === snakePositions[0].x &&
      bodyPartPosition.y === snakePositions[0].y
   ) {
      $BodyPart[0].classList.remove("body-part");
      $BodyPart[0].classList.add("active-body-part");

      score += 10;

      snakePositions.unshift({ ...snakePositions[0] });

      positionModifier
         ? (snakePositions[0][axis] += 1)
         : (snakePositions[0][axis] -= 1);

      bodyPartGenerator();
   }

   for (let i in $activeBodyPart) {
      $activeBodyPart[
         i
      ].style.gridArea = `${snakePositions[i].y} / ${snakePositions[i].x}`;
   }

   snakePositions.pop();
}

function checkIfCollision() {
   let checkX = snakePositions[0].x;
   let checkY = snakePositions[0].y;

   for (let i = 1; i < snakePositions.length; i++) {
      if (
         (checkX === snakePositions[i].x && checkY === snakePositions[i].y) ||
         snakePositions[0].x < 1 ||
         snakePositions[0].y < 1 ||
         snakePositions[0].x > 25 ||
         snakePositions[0].y > 25
      ) {
         // debugger;
         clearInterval(intervalId);
         const $gameOver = document.getElementById("game-over");

         $gameOver.innerHTML = `GAME OVER!<br>You're score: ${score}`;
         $gameOver.classList.remove("d-none");
         setTimeout(() => window.location.reload(), 1500);
      }
   }
}

window.addEventListener("keydown", function (event) {
   if (currentDirection !== event.code) {
      moveForward(event.code);
   }
});

function moveForward(direction) {
   if (direction === "ArrowRight" && currentDirection !== "ArrowLeft") {
      clearInterval(intervalId);
      currentDirection = "ArrowRight";
      interval("x", true);
      return currentDirection;
   } else if (direction === "ArrowUp" && currentDirection !== "ArrowDown") {
      clearInterval(intervalId);
      currentDirection = "ArrowUp";
      interval("y", false);
      return currentDirection;
   } else if (direction === "ArrowDown" && currentDirection !== "ArrowUp") {
      clearInterval(intervalId);
      currentDirection = "ArrowDown";
      interval("y", true);
      return currentDirection;
   } else if (direction === "ArrowLeft" && currentDirection !== "ArrowRight") {
      clearInterval(intervalId);
      currentDirection = "ArrowLeft";
      interval("x", false);
      return currentDirection;
   } else if (direction === "Space" && !pause) {
      pause = true;
      clearInterval(intervalId);
   } else if (direction === "Space" && pause) {
      pause = false;
      moveForward(currentDirection);
   }
}

function bodyPartGenerator() {
   speed > 100 ? (speed -= 5) : (speed -= 0);
   let randomY = getRandomInt(1, 26);
   let randomX = getRandomInt(1, 26);

   for (let positions of snakePositions) {
      if (positions.x === randomX && positions.y === randomY) {
         randomY = getRandomInt(1, 26);
         randomX = getRandomInt(1, 26);
      }
   }

   bodyPartPosition = { x: randomX, y: randomY };
   let randomPosition = `${randomY} / ${randomX}`;

   bodyPartHTMLcode = `<div class="body-part" style="grid-area: ${randomPosition}"></div>`;
   $playArea.innerHTML += bodyPartHTMLcode;
   $BodyPart = document.querySelectorAll(".body-part");
   $BodyPart = Array.from($BodyPart);

   $activeBodyPart = document.querySelectorAll(".active-body-part");
   $activeBodyPart = Array.from($activeBodyPart);
}

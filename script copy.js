let $playArea = document.querySelector(".play-area");
let $activeBodyPart = document.querySelectorAll(".active-body-part");
let $BodyPart = document.querySelectorAll(".body-part");
let $playBtn = document.querySelector(".play-btn");

$activeBodyPart = Array.from($activeBodyPart);

let intervalId = null;
let currentDirection = "right";
let bodyPartHTMLcode = "";

let snakePositions = [
   {
      x: 25,
      y: 25,
   },
];

//Interval nf
function interval(axis, boolean) {
   snakeMove(axis, boolean);
   intervalId = setInterval(function () {
      snakeMove(axis, boolean);
   }, 700);
}

//Random fn
function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

//Start game fn
function startGame() {
   // debugger;

   $playBtn.classList.add("d-none");

   bodyPartGenerator();
}

// Snake move fn
function snakeMove(axis, positionModifier) {
   snakePositions.unshift(snakePositions[0]);

   positionModifier
      ? (snakePositions[0][axis] += 1)
      : (snakePositions[0][axis] -= 1);

   for (let i in $activeBodyPart) {
      $activeBodyPart[
         i
      ].style.gridArea = `${snakePositions[i].y} / ${snakePositions[i].x}`;
   }

   snakePositions.pop();
   console.log(snakePositions);
}

window.addEventListener("keydown", function (event) {
   if (currentDirection !== event.code) {
      moveForward(event.code);
      console.log(event.code);
   }
});

function moveForward(direction) {
   clearInterval(intervalId);
   if (direction === "ArrowRight") {
      currentDirection = "ArrowRight";
      interval("x", true);
      return currentDirection;
   } else if (direction === "ArrowUp") {
      currentDirection = "ArrowUp";
      interval("y", false);
      return currentDirection;
   } else if (direction === "ArrowDown") {
      currentDirection = "ArrowDown";
      interval("y", true);
      return currentDirection;
   } else if (direction === "ArrowLeft") {
      currentDirection = "ArrowLeft";
      interval("x", false);
      return currentDirection;
   } else {
      clearInterval(move);
   }
}

function bodyPartGenerator() {
   let randomPosition = `${getRandomInt(1, 51)} / ${getRandomInt(1, 51)}`;

   // for (let positions in snakePositions) {
   //    if (`${positions.y} / ${positions.x}` === randomPosition) {
   //       return bodyPartGenerator();
   //    }
   // }

   bodyPartHTMLcode = `<div class="body-part" style="grid-area: ${randomPosition}"></div>`;
   $playArea.innerHTML += bodyPartHTMLcode;
   $BodyPart = document.querySelectorAll(".body-part");
   $activeBodyPart = document.querySelectorAll(".active-body-part");
   $activeBodyPart = Array.from($activeBodyPart);

   // console.log($BodyPart);

   intervalId = setInterval(function () {
      snakeMove("x", true);
   }, 700);
}

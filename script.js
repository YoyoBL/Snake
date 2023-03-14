let $playArea = document.querySelector(".play-area");
let $activeBodyPart = document.querySelectorAll(".active-body-part");
let $BodyPart = document.querySelectorAll(".body-part");
let $playBtn = document.querySelector(".play-btn");

let position = {
   x: 25,
   y: 25,
};

let gridPosition = "";

currentDirection = "right";

let move = null;

let xPositiveAddition = true;

let yPositiveAddition = true;

// Start button
$playBtn.addEventListener("click", startGame);

// Game Start Fn()
function startGame() {
   $playBtn.classList.add("d-none");
   snakeMove("x", xPositiveAddition);
}

window.addEventListener("keydown", function (event) {
   if (currentDirection !== event.code) {
      moveForward(event.code);
      console.log(event.code);
   }
});

function snakeMove(axis, positionModifier) {
   clearInterval(move);
   gridPosition = `${position.y} / ${position.x}`;
   $activeBodyPart[0].style.gridArea = gridPosition;
   positionModifier ? position[axis]++ : position[axis]--;

   move = setInterval(() => {
      gridPosition = `${position.y} / ${position.x}`;
      $activeBodyPart[0].style.gridArea = gridPosition;

      positionModifier ? position[axis]++ : position[axis]--;

      console.log($activeBodyPart[0]);
   }, 700);
   return move;
}

// Snake moves Fn()

function moveForward(direction) {
   if (direction === "ArrowRight") {
      currentDirection = "ArrowRight";
      xPositiveAddition = true;
      snakeMove("x", xPositiveAddition);
      return currentDirection;
   } else if (direction === "ArrowUp") {
      currentDirection = "ArrowUp";
      yPositiveAddition = false;
      snakeMove("y", yPositiveAddition);
      return currentDirection;
   } else if (direction === "ArrowDown") {
      currentDirection = "ArrowDown";
      yPositiveAddition = true;
      snakeMove("y", yPositiveAddition);
      return currentDirection;
   } else if (direction === "ArrowLeft") {
      currentDirection = "ArrowLeft";
      xPositiveAddition = false;
      snakeMove("x", xPositiveAddition);
      return currentDirection;
   } else {
      clearInterval(move);
   }
}

// function secCounter() {
//    let timeLeft = 3;
//    $secCounter.innerHTML = "4";

//    let countdownTimer = setInterval(() => {
//       if (timeLeft <= 0) {
//          clearInterval(countdownTimer);
//          $secCounter.innerHTML = "";
//       } else {
//          $secCounter.innerHTML = timeLeft;

//          timeLeft--;
//       }
//    }, 1000);
// }

function snakeMoves(axis) {
   moveForward();
}

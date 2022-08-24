const player1 = document.getElementById("player-1");
const player2 = document.getElementById("player-2");
const startGame = document.getElementById("startGame");
const cancelButton = document.getElementById("cancel");
const confirm1 = document.querySelector(".confirm1");
const confirm2 = document.querySelector(".confirm2");
const overlay1 = document.querySelector(".new-1");
const overlay2 = document.querySelector(".new-2");
const backdrop = document.querySelector(".backdrop");
const players = [{
  name: "",
  symbol: "X"
}, {
  name: "",
  symbol: "O"
}];
const gameFieldElements = document.querySelectorAll(".orderList li")
let activePlayer = 0;
let currentRound = 1
var gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

player1.addEventListener("click", function() {
  overlay1.style.display = "block";
  backdrop.style.display = "block";
  cancelButton.addEventListener("click", function() {
    overlay1.style.display = "none";
    backdrop.style.display = "none";
  })

  confirm1.addEventListener("click", function() {
    const text = document.getElementById('txt1').value;
    const playerOne = document.querySelector(".oneplayer").innerHTML = text;
    players[0].name = playerOne;
    overlay1.style.display = "none";
    backdrop.style.display = "none";
  })

})

player2.addEventListener("click", function() {
  overlay2.style.display = "block";
  backdrop.style.display = "block";

  cancelButton.addEventListener("click", function() {
    overlay2.style.display = "none";
    backdrop.style.display = "none";
  })

  confirm2.addEventListener("click", function() {
    const text = document.getElementById('txt2').value;
    const playerTwo = document.querySelector(".twoplayer").innerHTML = text;
    players[1].name = playerTwo;
    overlay2.style.display = "none";
    backdrop.style.display = "none";
  })
})

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
    document.getElementById("active-player-name").innerHTML = players[1].name;
  } else {
    activePlayer = 0;
    document.getElementById("active-player-name").innerHTML = players[0].name;
  }
}

startGame.addEventListener("click", function() {
  document.getElementById("startGame").disabled = true;
  resetGame();
  // document.getElementById("startGame").style.display = "none";
  document.querySelector(".winner").style.display = "none";
  document.getElementById("active-player-name").innerHTML = players[0].name;
  document.querySelector(".game").style.display = "block";
  for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener("click", function() {
      console.log("clicked");
      const selectedColumn = event.target.dataset.col - 1;
      const selectedRow = event.target.dataset.row - 1;
      if (gameData[selectedRow][selectedColumn] > 0) {
        // console.log(gameData[selectedRow][selectedColumn]);
        // alert("Please select empty box");
        return;
      };
      event.target.textContent = players[activePlayer].symbol;
      event.target.classList.add('disabled');

      gameData[selectedRow][selectedColumn] = activePlayer + 1;
      console.log(gameData[selectedRow][selectedColumn]);
      const winner = gameOver();
      if (winner !== 0) {
          for (const gameFieldElement of gameFieldElements) {
        gameFieldElement.click(true);
      }
        gameEnd(winner);
      }


      currentRound++;
      switchPlayer();
    }, {once : true} )
  }
return;
});


function gameOver() {
  for (var i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  for (var i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function gameEnd(winner){

  if (winner > 0) {
    const id = winner - 1;
    const winnerName = players[id].name;
    // document.getElementById("startGame").style.display = "block";
    // document.getElementById("startGame").style.textAlign = "center";
    document.getElementById("winner-player").innerHTML = winnerName;
    document.querySelector(".winner").style.display = "block";
    document.getElementById("startGame").disabled = false;

  } else {
      document.getElementById("draw").innerHTML = "It's a draw!";
      // document.getElementById("startGame").style.display = "block";
      document.querySelector(".winner").style.display = "block";
      document.getElementById("startGame").disabled = false;
  }
};

function resetGame() {
  activePlayer = 0;
  currentRound = 1;
  winner = 0;
  gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]

  document.querySelector(".winner").style.display = "none";
  for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.innerHTML = "";
    gameFieldElement.classList.remove('disabled');
  }
}

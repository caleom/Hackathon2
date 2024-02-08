window.addEventListener("load", () => {
  // Array with game options//
  const choices = ["rock", "paper", "scissors", "spock", "lizard"];

  //varables to keep track of scores
  let userScore = 0;
  let compScore = 0;

  //  event listeners for all choicebuttons class and adds the handle choice functions to it //
  const optionButtons = document.querySelectorAll(".choiceBtn");
  optionButtons.forEach((button) =>
    button.addEventListener("click", handleChoice)
  );

  // event listener for username submit button and query selector for nameinputfield.
  const nameButton = document.getElementById("submitBtn");
  nameButton.addEventListener("click", handleName);

  function handleName() {
    let nameField = document.getElementById("nameInput").value;
    let nameUpdate = document.getElementById("userName");
    nameUpdate.innerText = `${nameField}'s score:`;
    // remove input area after submit.
    let section = document.querySelector("section");
    section.style.display = "none";
  }

  // eventtlistener + function for start game button (
  // document.querySelector(".startBtn").addEventListener("click", clickedStart());

  // function clickedStart() {
  //   document.getElementById("userScore").textContent = "Player Score: 0";
  //   document.getElementById("compScore").textContent = "Comp Score: 0";
  //   // resets score to 0
  //   userScore = 0;
  //   compScore = 0;
  // }

  // eventtlistener + function for finish game button
  // document.querySelector(".finishBtn").addEventListener("click", clickedFinish());

  // function clickedFinish() {
  //   let play = document.querySelector("#gameScreen");
  //   let finish = document.querySelector("#endScreen");

  //   play.style.display = "none";
  //   finish.style.display = "block";
  // }

  // eventtlistener + function for restart game button
  // document.querySelector(".resetBtn").addEventListener("click", clickedReset());

  // function clickedReset() {
  //   let finish = document.querySelector("#endScreen");
  //   let home = document.querySelector("#homePage");

  //   finish.style.display = "none";
  //   home.style.display = "block";
  // }
  // function for .choice buttons
  function handleChoice(e) {
    //grabs userchoice//
    let userChoice = e.target.id;
    //generates computer choice//
    let computerChoice = choices[Math.floor(Math.random() * choices.length)];
    // updated the choices in HTML
    // document.getElementById(
    //   "playerDisplay"
    // ).textContent = `Player: ${userChoice}`;
    // document.getElementById(
    //   "computerDisplay"
    // ).textContent = `Computer: ${computerChoice}`;
    // then runs the determineWinner function below
    determineWinner(userChoice, computerChoice);
  }

  function determineWinner(userChoice, computerChoice) {
    let roundLimit = 5;

    const winConditions = {
      rock: ["scissors", "spock"],
      paper: ["rock", "spock"],
      scissors: ["paper", "lizard"],
      lizard: ["spock", "paper"],
      spock: ["rock", "scissors"],
    };

    // check if user has won and updates HTML with result of round + increments score.
    if (winConditions[userChoice].includes(computerChoice)) {
      document.getElementById("resultDisplay").innerText = "You Win👍";
      ++userScore;
    } else if (computerChoice === userChoice) {
      document.getElementById("resultDisplay").innerText = "It's a tie👔";
    } else {
      document.getElementById("resultDisplay").innerText = "Computer Wins👎";
      ++compScore;
    }

    // update scoreboard
    document.getElementById("userScore").textContent = `${userScore}`;
    document.getElementById(
      "compScore"
    ).textContent = `Comp Score: ${compScore}`;

    if (userScore > roundLimit / 2) {
      showResults("user");
    } else if (compScore > roundLimit / 2) {
      showResults("comp");
    }

    updateVs(userChoice, computerChoice);
  }
});

//update VS div
function updateVs(player1, player2) {
  const emoji = {
    rock: "🤜",
    paper: "📃",
    scissors: "✂️",
    lizard: "🦎",
    spock: "🖖",
  };

  let vsBox = document.getElementById("vsBox");

  vsBox.innerText = `${emoji[player1]} VS ${emoji[player2]}`;
}

const modalButton = document.getElementById("resultsModalButton");

modalButton.addEventListener("click", showResults);

//results modal
function showResults(data) {
  const resultModal = new bootstrap.Modal(
    document.getElementById("resultModal")
  );
  let content = document.getElementById("modal-body");

  if (data === "user") {
    content.innerText = "userwon";
  } else if (data === "comp") {
    content.innerText = "compwon";
  }

  resultModal.show();
}

// Event listener for the reset button
const resetButton = document.querySelector(".resetBtn");
resetButton.addEventListener("click", handleReset);

// Function to handle resetting the game
function handleReset(userScore, compScore) {
  userScore = 0;
  compScore = 0;

  // makes input field avail again
  let section = document.querySelector("section");
  section.style.display = "block";

  // Reset player name and scores in the UI
  document.getElementById("nameInput").value = "";
  document.getElementById("userName").innerText = `Player Score:`;
  document.getElementById("userScore").style.display = "none";
  document.getElementById("compScore").innerText = `Comp Score:`;
  document.getElementById("vsBox").innerText = "VS";
  document.getElementById("resultDisplay").innerText = "";
}

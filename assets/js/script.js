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

  // function for .choice buttons
  function handleChoice(e) {
    //grabs userchoice//
    let userChoice = e.target.id;
    //generates computer choice//
    let computerChoice = choices[Math.floor(Math.random() * choices.length)];

    determineWinner(userChoice, computerChoice);
  }

  function determineWinner(userChoice, computerChoice) {
    let roundLimit = 5;
    let userScore = document.getElementById("userScore").innerText
    let compScore = document.getElementById("compScore").innerText

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
      userScore++;
    } else if (computerChoice === userChoice) {
      document.getElementById("resultDisplay").innerText = "It's a tie👔";
    } else {
      document.getElementById("resultDisplay").innerText = "Computer Wins👎";
      compScore++;
    }

    // update scoreboard
    document.getElementById("userScore").textContent = `${userScore}`;
    document.getElementById("compScore").textContent = `${compScore}`;

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

//results modal
function showResults(data) {

  const resultModal = new bootstrap.Modal(
    document.getElementById("resultModal")
  );
  let content = document.getElementById("modal-body");

  if (data === "user") {
    content.innerHTML = `⭐You won!⭐<br>
                        Play again to see if you succeed again<br>
                        <i class="h1 fa-solid fa-trophy fa-beat" style="color: #e6b755;"></i>`;
  } else if (data === "comp") {
    content.innerHTML = `😭You lost😭<br>
                          Play again to win!<br>
                          <i class="h1 fa-solid fa-skull-crossbones fa-shake" style="color: #fe0107;"></i>`;
  }
  handleReset();
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
  document.getElementById("userScore").innerText = `0`;
  document.getElementById("compScore").innerText = `0`;
  document.getElementById("vsBox").innerText = "VS";
  document.getElementById("resultDisplay").innerText = "";
}

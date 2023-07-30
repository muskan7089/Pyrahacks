const elements = [
    { atomicNumber: 1, symbol: "H", name: "Hydrogen" },
    { atomicNumber: 2, symbol: "He", name: "Helium" },
    { atomicNumber: 3, symbol: "Li", name: "Lithium" },
    { atomicNumber: 4, symbol: "Be", name: "Beryllium" },
    { atomicNumber: 5, symbol: "B", name: "Boron" },
    { atomicNumber: 6, symbol: "C", name: "Carbon" },
    { atomicNumber: 7, symbol: "N", name: "Nitrogen" },
    { atomicNumber: 8, symbol: "O", name: "Oxygen" },
    { atomicNumber: 9, symbol: "F", name: "Fluorine" },
    { atomicNumber: 10, symbol: "Ne", name: "Neon" },
    { atomicNumber: 11, symbol: "Na", name: "Sodium" },
    { atomicNumber: 12, symbol: "Mg", name: "Magnesium" },
    { atomicNumber: 13, symbol: "Al", name: "Aluminum" },
    { atomicNumber: 14, symbol: "Si", name: "Silicon" },
    { atomicNumber: 15, symbol: "P", name: "Phosphorus" },
    { atomicNumber: 16, symbol: "S", name: "Sulfur" },
    { atomicNumber: 17, symbol: "Cl", name: "Chlorine" },
    { atomicNumber: 18, symbol: "Ar", name: "Argon" },
    { atomicNumber: 19, symbol: "K", name: "Potassium" },
    { atomicNumber: 20, symbol: "Ca", name: "Calcium" },
    // Add more elements here...
    { atomicNumber: 111, symbol: "Rg", name: "Roentgenium" },
    { atomicNumber: 112, symbol: "Cn", name: "Copernicium" },
    { atomicNumber: 113, symbol: "Nh", name: "Nihonium" },
    { atomicNumber: 114, symbol: "Fl", name: "Flerovium" },
    { atomicNumber: 115, symbol: "Mc", name: "Moscovium" },
    { atomicNumber: 116, symbol: "Lv", name: "Livermorium" },
    { atomicNumber: 117, symbol: "Ts", name: "Tennessine" },
    { atomicNumber: 118, symbol: "Og", name: "Oganesson" },
  ];
  
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("optionsContainer");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("timer");
  const factElement = document.getElementById("fact");
  const highScoreElement = document.getElementById("highScore");
  const startButton = document.getElementById("startButton");
  const tryAgainButton = document.getElementById("tryAgain");

  const elementSortingContainer = document.getElementById("elementSortingContainer");
  const startSortingButton = document.getElementById("startSortingButton");

  let elementSortingGameStarted = false;

  startSortingButton.addEventListener("click", startElementSortingGame);

  
  const correctSound = new Audio("correct.mp3"); // Replace with the path to the correct sound file
  const incorrectSound = new Audio("incorrect.mp3"); // Replace with the path to the incorrect sound file
  
  let currentElement = null;
  let score = 0;
  let highScore = 0; // Initialize high score to 0
  let gameStarted = false;
  let timerInterval;
  let timeLeft = 10; // Set the time limit for each question in seconds
  
  // Check if high score exists in localStorage
  if (localStorage.getItem("highScore")) {
    highScore = parseInt(localStorage.getItem("highScore"));
    updateHighScore();
  }
  
  startButton.addEventListener("click", startGame);
  
  function startGame() {
    gameStarted = true;
    startButton.style.display = "none";
    tryAgainButton.style.display = "none";
    score = 0;
    scoreElement.textContent = score;
    resetTimer();
    displayNextQuestion();
  }

  function startElementSortingGame() {
    elementSortingGameStarted = true;
    startSortingButton.style.display = "none";
    displayElementSorting();
  }
  
  function displayElementSorting() {
    if (!elementSortingGameStarted) return;
  
    const shuffledElements = elements.slice().sort(() => Math.random() - 0.5);
    elementSortingContainer.innerHTML = "";
  
    shuffledElements.forEach(element => {
      const elementCard = document.createElement("div");
      elementCard.textContent = element.symbol;
      elementCard.classList.add("element-card");
      elementCard.setAttribute("draggable", true);
      elementCard.setAttribute("data-atomic-number", element.atomicNumber);
      elementCard.addEventListener("dragstart", dragStart);
      elementCard.addEventListener("dragover", dragOver);
      elementCard.addEventListener("drop", drop);
      elementSortingContainer.appendChild(elementCard);
    });
  }
  
  function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.atomicNumber);
  }
  
  function dragOver(event) {
    event.preventDefault();
  }
  
  function drop(event) {
    event.preventDefault();
    const atomicNumber = event.dataTransfer.getData("text/plain");
    const elementCard = document.querySelector(`[data-atomic-number="${atomicNumber}"]`);
    event.target.before(elementCard);
  }
  displayElementSorting();
  function resetTimer() {
    timeLeft = 10; // Reset the time limit for each question
    updateTimer();
  }
  
  function updateTimer() {
    timerElement.textContent = `Time Left: ${timeLeft}s`;
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft === 0) {
        clearTimeout(timerInterval);
        resultMessage("Time's up! ⏰", "#F44336");
      }
    }, 1000);
  }
  
  function displayNextQuestion() {
    if (!gameStarted) return;
  
    resetTimer();
  
    currentElement = elements[Math.floor(Math.random() * elements.length)];
    const correctOption = Math.floor(Math.random() * 4);
  
    questionElement.textContent = `What is the symbol for the element with atomic number ${currentElement.atomicNumber}?`;
    optionsContainer.innerHTML = "";
  
    for (let i = 0; i < 4; i++) {
      const option = document.createElement("button");
      option.textContent = i === correctOption ? currentElement.symbol : getRandomSymbol();
      option.className = "option";
      option.addEventListener("click", checkAnswer);
      optionsContainer.appendChild(option);
    }
  
    startTimer();
  }
  
  function getRandomSymbol() {
    // Returns a random symbol from the elements array (excluding the current element)
    const randomElement = elements.filter(el => el.symbol !== currentElement.symbol);
    return randomElement[Math.floor(Math.random() * randomElement.length)].symbol;
  }
  
  function checkAnswer(event) {
    const selectedOption = event.target.textContent;
  
    if (selectedOption === currentElement.symbol) {
      score++;
      resultMessage("Correct! 🎉", "#4CAF50");
      correctSound.play(); // Play the correct sound
    } else {
      resultMessage("Incorrect! 😕", "#F44336");
      incorrectSound.play(); // Play the incorrect sound
      score--;
    }
  
    scoreElement.textContent = score;
    clearTimeout(timerInterval);
    displayNextQuestion();
  }
  
  function resultMessage(message, color) {
    questionElement.textContent = message;
    questionElement.style.color = color;
    optionsContainer.innerHTML = "";
    tryAgainButton.style.display = "inline";
  
    // Update high score if applicable
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      updateHighScore();
    }
  
    // Display a random fact after each question
    showRandomFact();
  }
  
  function showRandomFact() {
    // Display a random fact from the randomFacts array
    const randomIndex = Math.floor(Math.random() * randomFacts.length);
    factElement.textContent = randomFacts[randomIndex];
  }
  
  function updateHighScore() {
    highScoreElement.textContent = `High Score: ${highScore}`;
  }
  
  tryAgainButton.addEventListener("click", resetQuiz);
  
  function resetQuiz() {
    gameStarted = false;
    questionElement.style.color = "";
    tryAgainButton.style.display = "none";
    startButton.style.display = "inline";
    clearTimeout(timerInterval);
    resetTimer();
  }

  const randomFacts = [
    "The element with atomic number 1, Hydrogen, is the most abundant element in the universe.",
    "Oxygen, with atomic number 8, is essential for respiration and combustion.",
    "Helium (Atomic Number 2) is the second most abundant element in the universe and is used in cooling systems for MRI machines.",
    "Carbon (Atomic Number 6) is the foundation of all organic molecules and is essential for life on Earth.",
    "Gold (Atomic Number 79) is one of the least reactive chemical elements and has been used for jewelry and currency for thousands of years.",
    "Uranium (Atomic Number 92) is used as fuel in nuclear reactors and plays a crucial role in generating nuclear power.",
    "Mercury (Atomic Number 80) is the only metal that is liquid at room temperature.",
    "Neon (Atomic Number 10) is used in neon signs due to its bright, colorful glow when electrified.",
    "Silicon (Atomic Number 14) is a key component of computer chips and other electronic devices.",
    // Add more facts about elements here...
  ];
  
  
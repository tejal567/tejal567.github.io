const screen = document.getElementById('screen');
const bestTimeElement = document.getElementById('best-time');
let startTime, endTime;
let timeoutId;
let bestTime = localStorage.getItem('bestTime') ? parseFloat(localStorage.getItem('bestTime')) : null;

function startGame() {
  screen.textContent = "Wait for Green...";
  screen.className = "red";

  // Set a random delay between 2 and 5 seconds
  const randomDelay = Math.random() * (5000 - 2000) + 2000;

  timeoutId = setTimeout(() => {
    screen.textContent = "Tap Now!";
    screen.className = "green";
    startTime = Date.now();
  }, randomDelay);
}

function handleInteraction() {
  if (screen.classList.contains('red')) {
    // Clicked too early
    clearTimeout(timeoutId);
    screen.textContent = "Too Soon! Try Again.";
    screen.className = "neutral";
    setTimeout(startGame, 2000);
  } else if (screen.classList.contains('green')) {
    // Calculate reaction time
    endTime = Date.now();
    const reactionTime = (endTime - startTime) / 1000; // in seconds
    screen.textContent = `Your Reaction Time: ${reactionTime.toFixed(3)} seconds`;
    screen.className = "neutral";

    // Update best time
    if (bestTime === null || reactionTime < bestTime) {
      bestTime = reactionTime;
      localStorage.setItem('bestTime', bestTime);
      screen.textContent = `New Best Reaction Time: ${reactionTime.toFixed(3)} seconds`;
      bestTimeElement.textContent = `Best Time: ${bestTime.toFixed(3)} seconds`;
    }

    setTimeout(startGame, 3000);
  }
}

// Initialize the game
screen.addEventListener('touchstart', handleInteraction);
screen.addEventListener('click', handleInteraction);
startGame();
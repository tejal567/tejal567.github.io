const screen = document.getElementById('screen');
const bestTimeElement = document.getElementById('best-time');
const bestTimeText = bestTimeElement.querySelector('span');
let startTime, endTime;
let timeoutId;
let bestTime = localStorage.getItem('bestTime') ? parseFloat(localStorage.getItem('bestTime')) : null;
let isWaitingToRestart = true; // State to track if we are waiting to restart the game
const resetButton = document.getElementById('reset-button');

function resetBestTime() {
  bestTime = null;
  localStorage.removeItem('bestTime');
  bestTimeText.textContent = "Best time: N/A";
}

function startGame() {
  screen.textContent = "Wait for green...";
  screen.className = "red";

  // Set a random delay between 2 and 5 seconds
  const randomDelay = Math.random() * (5000 - 2000) + 2000;

  timeoutId = setTimeout(() => {
    screen.textContent = "Tap now!";
    screen.className = "green";
    startTime = Date.now();
  }, randomDelay);
}

function handleInteraction(event) {
  // Prevent the default behavior to avoid conflicts between touch and click
  event.preventDefault();

  if (isWaitingToRestart) {
    // If waiting to restart, start the game and reset the state
    isWaitingToRestart = false;
    startGame();
    return;
  }

  if (screen.classList.contains('red')) {
    // Clicked too early
    clearTimeout(timeoutId);
    screen.textContent = "Too soon! Try again.";
    screen.className = "neutral";
    setTimeout(startGame, 2000);
  } else if (screen.classList.contains('green')) {
    // Calculate reaction time
    endTime = Date.now();
    const reactionTime = (endTime - startTime) / 1000; // in seconds
    screen.textContent = `Your reaction time: ${reactionTime.toFixed(3)} seconds`;
    screen.className = "neutral";

    // Update best time
    if (bestTime === null || reactionTime < bestTime) {
      bestTime = reactionTime;
      localStorage.setItem('bestTime', bestTime);
      screen.textContent = `New best reaction time: ${reactionTime.toFixed(3)} seconds`;
      bestTimeText.textContent = `Best time: ${bestTime.toFixed(3)} seconds`;
    }

    // Set the state to wait for restart
    isWaitingToRestart = true;
  }
}

screen.textContent = "Tap to start the game.";
screen.className = "neutral";
// Add a single event listener for both starting and restarting the game
screen.addEventListener('touchstart', handleInteraction); // For mobile
screen.addEventListener('click', handleInteraction); // For desktop

// Add event listeners for both click and touchstart
resetButton.addEventListener('click', resetBestTime);
resetButton.addEventListener('touchstart', (event) => {
  event.preventDefault(); // Prevent default touch behavior
  resetBestTime();
});
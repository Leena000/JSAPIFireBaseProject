// Run when page is ready
document.addEventListener("DOMContentLoaded", () => {

  // Get user name from browser memory
  const storedName = localStorage.getItem("userName");

  // Show name on page, or Guest if empty
  document.getElementById("userName").innerText = storedName || "Guest";

  // Get birthday quotes from internet
  fetch("https://corsproxy.io/?https://type.fit/api/quotes")
    .then(res => res.json())
    .then(quotes => {

      // Pick one random quote
      const q = quotes[Math.floor(Math.random() * quotes.length)];

      // Show quote text
      document.getElementById("quoteText").innerText = `"${q.text}"`;

      // Show author name or Unknown
      document.getElementById("quoteAuthor").innerText =
        q.author ? `— ${q.author}` : "— Unknown";
    })
    .catch(() => {
      // If quote does not load
      document.getElementById("quoteText").innerText =
        "Wishing you a very Happy Birthday!";
      document.getElementById("quoteAuthor").innerText = "";
    });

  // When home button is clicked
  const homeBtn = document.getElementById("homeBtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      // Go to signup page
      window.location.href = "UserSignUpPage.html";
    });
  }

  // Music play and stop
  const music = document.getElementById("birthdayMusic");
  const playBtn = document.getElementById("musicBtn");

  let isPlaying = false;

  playBtn.addEventListener("click", () => {
    if (!isPlaying) {
      // Start music
      music.play();
      playBtn.innerText = "Stop Music";
      isPlaying = true;
    } else {
      // Stop music
      music.pause();
      music.currentTime = 0;
      playBtn.innerText = "Play Music";
      isPlaying = false;
    }
  });

});

// Make confetti on screen
function createConfetti() {
  const container = document.getElementById("confetti-container");
  const colors = ["red", "yellow", "blue", "green", "pink", "orange"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Random position
    confetti.style.left = Math.random() * 100 + "vw";

    // Random color
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    // Random speed
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";

    container.appendChild(confetti);

    // Remove after 5 seconds
    setTimeout(() => confetti.remove(), 5000);
  }
}

// Start confetti
createConfetti();

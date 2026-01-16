// Run when page is ready
document.addEventListener("DOMContentLoaded", () => {

  // Show user name
  const userName = localStorage.getItem("userName");
  document.getElementById("userName").innerText = userName || "Guest";

  // Get random birthday quote
  fetch("https://corsproxy.io/?https://type.fit/api/quotes")
    .then(res => res.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex];

      document.getElementById("quoteText").innerText = `"${quote.text}"`;
      document.getElementById("quoteAuthor").innerText =
        quote.author ? `— ${quote.author}` : "— Unknown";
    })
    .catch(() => {
      document.getElementById("quoteText").innerText =
        "Wishing you a very Happy Birthday!";
      document.getElementById("quoteAuthor").innerText = "";
    });

  // Home button
  const homeBtn = document.getElementById("homeBtn");
  homeBtn.addEventListener("click", () => {
    window.location.href = "UserSignUpPage.html";
  });

  // Logout button (Firebase signout)
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {

    firebase.auth().signOut()
      .then(() => {

        // Clear saved user info
        localStorage.removeItem("userName");
        localStorage.removeItem("userDOB");
        localStorage.removeItem("userEmail");

        alert("You are logged out");

        // Go to signup page
        window.location.href = "UserSignUpPage.html";

      })
      .catch(() => {
        alert("Logout failed");
      });

  });

  // Music play / stop
  const music = document.getElementById("birthdayMusic");
  const musicBtn = document.getElementById("musicBtn");
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      music.play();
      musicBtn.innerText = "Stop Music";
      isPlaying = true;
    } else {
      music.pause();
      music.currentTime = 0;
      musicBtn.innerText = "Play Music";
      isPlaying = false;
    }
  });

});

// Confetti effect
function createConfetti() {
  const container = document.getElementById("confetti-container");
  const colors = ["red", "yellow", "blue", "green", "pink", "orange"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";

    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

// Start confetti
createConfetti();

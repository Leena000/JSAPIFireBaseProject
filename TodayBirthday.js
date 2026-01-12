document.addEventListener("DOMContentLoaded", () => {

  /*  USER NAME  */
  const storedName = localStorage.getItem("userName");
  document.getElementById("userName").innerText = storedName || "Guest";

  /* QUOTE + AUTHOR */
  fetch("https://corsproxy.io/?https://type.fit/api/quotes")
    .then(res => res.json())
    .then(quotes => {
      const q = quotes[Math.floor(Math.random() * quotes.length)];

      document.getElementById("quoteText").innerText = `"${q.text}"`;
      document.getElementById("quoteAuthor").innerText =
        q.author ? `— ${q.author}` : "— Unknown";
    })
    .catch(() => {
      document.getElementById("quoteText").innerText =
        "Wishing you a very Happy Birthday!";
      document.getElementById("quoteAuthor").innerText = "";
    });

  /* HOME BUTTON */
  const homeBtn = document.getElementById("homeBtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "UserSignUpPage.html";
    });
  }

  /*  MUSIC  */
  const music = document.getElementById("birthdayMusic");
  const playBtn = document.getElementById("musicBtn");

  let isPlaying = false;

  playBtn.addEventListener("click", () => {
    if (!isPlaying) {
      music.play();
      playBtn.innerText = "Stop Music";
      isPlaying = true;
    } else {
      music.pause();
      music.currentTime = 0;
      playBtn.innerText = "Play Music";
      isPlaying = false;
    }
  });

});

/* CONFETTI  */
function createConfetti() {
  const container = document.getElementById("confetti-container");
  const colors = ["red", "yellow", "blue", "green", "pink", "orange"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";

    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
  }
}

createConfetti();

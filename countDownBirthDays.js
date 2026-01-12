document.addEventListener("DOMContentLoaded", () => {

  const dob = localStorage.getItem("userDOB");

  // Home button
  document.getElementById("homeBtn").addEventListener("click", () => {
    window.location.href = "UserSignUpPage.html";
  });

  if (!dob) {
    document.getElementById("countdownMessage").innerText =
      "Date of Birth not found";
    return;
  }

  const birthDate = new Date(dob);

  function updateCountdown() {
    const now = new Date();

    let nextBirthday = new Date(
      now.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    const diffMs = nextBirthday - now;

    // If birthday reached
    if (diffMs <= 0) {
      window.location.href = "TodayBirthday.html";
      return;
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const totalDays = Math.floor(totalHours / 24);

    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;

    // Update UI
    document.getElementById("months").innerText = months;
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");

    document.getElementById("countdownMessage").innerText =
      "⏳ Counting down to your special day!";
  }

  // Initial call
  updateCountdown();

  // Update every second
  setInterval(updateCountdown, 1000);
});

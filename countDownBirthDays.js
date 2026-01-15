// Run when page is loaded
document.addEventListener("DOMContentLoaded", () => {

  // Get user's date of birth from browser
  const dob = localStorage.getItem("userDOB");

  // Home button click
  document.getElementById("homeBtn").addEventListener("click", () => {
    window.location.href = "UserSignUpPage.html";
  });

  // If no date of birth found
  if (!dob) {
    document.getElementById("countdownMessage").innerText =
      "Date of Birth not found";
    return;
  }

  // Convert DOB string to Date
  const birthDate = new Date(dob);

  // Function to update countdown
  function updateCountdown() {
    const now = new Date();  // Current date and time

    // Set next birthday for this year
    let nextBirthday = new Date(
      now.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    // If birthday already passed this year, use next year
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    // Time difference in milliseconds
    const diffMs = nextBirthday - now;

    // If birthday is today
    if (diffMs <= 0) {
      window.location.href = "TodayBirthday.html";
      return;
    }

    // Convert time to seconds, minutes, hours, days
    const totalSeconds = Math.floor(diffMs / 1000);
    const seconds = totalSeconds % 60;

    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;

    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;

    const totalDays = Math.floor(totalHours / 24);

    // Convert days to months and days (simple way)
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;

    // Show values on page
    document.getElementById("months").innerText = months;
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");

    // Show message
    document.getElementById("countdownMessage").innerText =
      "⏳ Counting down to your special day!";
  }

  // Run once when page opens
  updateCountdown();

  // Run every second
  setInterval(updateCountdown, 1000);
});

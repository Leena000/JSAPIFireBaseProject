// Wait until the whole HTML page is loaded
document.addEventListener("DOMContentLoaded", () => {

  // Get all input fields and button by their IDs
  const nameInput = document.getElementById("name");       // Full name input
  const dobInput = document.getElementById("dob");         // Date of birth input
  const emailInput = document.getElementById("email");     // Email input
  const passInput = document.getElementById("password");   // Password input
  const btn = document.getElementById("mainBtn");          // Sign Up button

  // When user clicks the Sign Up button
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // Stop form from refreshing the page

    // Get values entered by user and remove extra spaces
    const name = nameInput.value.trim();
    const dob = dobInput.value;
    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    // Check if any field is empty
    if (!name || !dob || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Create a new user record in Firebase database
    const userRef = firebase.database().ref("birthdayUsers").push();

    // Save user data in database
    userRef.set({
      name: name,
      dob: dob,
      email: email,
      password: password
    })
    .then(() => {
      
  // Save for other pages
  localStorage.setItem("userName", name);
  localStorage.setItem("userDOB", dob);
  localStorage.setItem("userEmail", email);
      alert("SignUp is successful");

      // Check if today is user's birthday
      if (isBirthdayToday(dob)) {
        // If yes, go to Birthday page
        window.location.href = "TodayBirthday.html";
      } else {
        // If not, go to Countdown page
        window.location.href = "countDownBirthDays.html";
      }
    })
    .catch(() => {
      // If any error happens while saving
      alert("Error saving data");
    });
  });

  // When user clicks "Sign In" text
  document.getElementById("goToLogin").addEventListener("click", () => {
    // Go to Sign In page
    window.location.href = "SigninPage.html";
  });

});

// Function to check if today is user's birthday
function isBirthdayToday(dob) {
  // Split date like "2000-05-20" into year, month, day
  const [y, m, d] = dob.split("-").map(Number);

  // Get today's date
  const today = new Date();

  // Compare month and day with today
  return m === today.getMonth() + 1 && d === today.getDate();
}

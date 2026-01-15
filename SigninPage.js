// Run when page is loaded
document.addEventListener("DOMContentLoaded", () => {

  // Get all needed elements from page
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const loginBtn = document.getElementById("loginSubmit");
  const homeBtn = document.getElementById("homeBtn");
  const goToSignup = document.getElementById("goToSignup");

  // Go to home/signup page when home button is clicked
  homeBtn.addEventListener("click", () => {
    window.location.href = "UserSignUpPage.html";
  });

  // Go to signup page when "Sign Up" is clicked
  goToSignup.addEventListener("click", () => {
    window.location.href = "UserSignUpPage.html";
  });

  // When login button is clicked
  loginBtn.addEventListener("click", () => {

    // Get values entered by user
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Check if fields are empty
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Read all users from database
    firebase.database().ref("birthdayUsers").once("value", (snapshot) => {

      // If no users in database
      if (!snapshot.exists()) {
        alert("No users found");
        return;
      }

      let found = false;

      // Check each user
      snapshot.forEach((child) => {
        const user = child.val();

        // Match email and password
        if (user.email === email && user.password === password) {
          found = true;

          // Save user info in browser
          localStorage.setItem("userName", user.name);
          localStorage.setItem("userDOB", user.dob);
          localStorage.setItem("userEmail", user.email);

          alert("Login Successful");

          // Check birthday
          if (isBirthdayToday(user.dob)) {
            window.location.href = "TodayBirthday.html";
          } else {
            window.location.href = "countDownBirthDays.html";
          }
        }
      });

      // If no match found
      if (!found) {
        alert("Wrong Email or Password");
      }
    });
  });

});

// Function to check if today is birthday
function isBirthdayToday(dob) {
  if (!dob) return false;

  const parts = dob.split("-");
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  const today = new Date();

  return month === today.getMonth() + 1 && day === today.getDate();
}

document.addEventListener("DOMContentLoaded", () => {

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const loginBtn = document.getElementById("loginSubmit");
  const homeBtn = document.getElementById("homeBtn");
  const goToSignup = document.getElementById("goToSignup");

  homeBtn.addEventListener("click", () => {
    window.location.href = "UserSignUpPage.html";
  });

  goToSignup.addEventListener("click", () => {
    window.location.href = "UserSignUpPage.html";
  });

  loginBtn.addEventListener("click", () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Read from same signup database
    firebase.database().ref("birthdayUsers").once("value", (snapshot) => {

      if (!snapshot.exists()) {
        alert("No users found");
        return;
      }

      let found = false;

      snapshot.forEach((child) => {
        const user = child.val();

        if (user.email === email && user.password === password) {
          found = true;

          localStorage.setItem("userName", user.name);
          localStorage.setItem("userDOB", user.dob);
          localStorage.setItem("userEmail", user.email);

          alert("Login Successful");

          if (isBirthdayToday(user.dob)) {
            window.location.href = "TodayBirthday.html";
          } else {
            window.location.href = "countDownBirthDays.html";
          }
        }
      });

      if (!found) {
        alert("Wrong Email or Password");
      }
    });
  });

});

// Birthday check (same as yours)
function isBirthdayToday(dob) {
  if (!dob) return false;
  const parts = dob.split("-");
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  const today = new Date();
  return month === today.getMonth() + 1 && day === today.getDate();
}

document.addEventListener("DOMContentLoaded", () => {

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const loginBtn = document.getElementById("loginSubmit");
  const homeBtn = document.getElementById("homeBtn");
  const goToSignup = document.getElementById("goToSignup");

  // HOME → Signup page
  homeBtn.addEventListener("click", () => {
    window.location.href = "UserSignUpPage.html";
  });

  goToSignup.addEventListener("click", () => {
    window.location.href = "UserSignUpPage.html";
  });

  // SIGN IN
  loginBtn.addEventListener("click", () => {
    console.log("Sign In button clicked");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {

        const uid = userCredential.user.uid;

        firebase.database().ref("users/" + uid).once("value")
          .then(snapshot => {

            if (!snapshot.exists()) {
              alert("User data not found");
              return;
            }

            const { name, dob } = snapshot.val();

            localStorage.setItem("userName", name);
            localStorage.setItem("userDOB", dob);

            if (isBirthdayToday(dob)) {
              window.location.href = "TodayBirthday.html";
            } else {
              window.location.href = "countDownBirthDays.html";
            }
          });
      })
      .catch((error) => {

        if (error.code === "auth/user-not-found") {
          const wantsSignup = confirm(
            "User not registered.\nDo you want to Sign Up now?"
          );
          if (wantsSignup) {
            alert("Click the Home 🏠 button to Sign Up.");
          }
        } else {
          alert(error.message);
        }
      });
  });

});

// Birthday check
function isBirthdayToday(dob) {
  if (!dob) return false;

  // dob format: YYYY-MM-DD
  const parts = dob.split("-");
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  return month === todayMonth && day === todayDay;
}


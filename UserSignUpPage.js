document.addEventListener("DOMContentLoaded", () => {

  const user_Name = document.getElementById("name");
  const user_DOB = document.getElementById("dob");
  const signUpEmail = document.getElementById("email");
  const signUpPassword = document.getElementById("password");
  const btnSignUp = document.getElementById("mainBtn");

  // SIGN UP
  btnSignUp.addEventListener("click", (e) => {
    e.preventDefault();

    const name = user_Name.value.trim();
    const dob = user_DOB.value;
    const email = signUpEmail.value.trim();
    const password = signUpPassword.value.trim();

    if (!name || !dob || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {

        const uid = userCredential.user.uid;

        // Save user data
        firebase.database().ref("users/" + uid).set({
          name,
          dob,
          email
        });

        localStorage.setItem("userName", name);
        localStorage.setItem("userDOB", dob);

        alert("User Registered Successfully");

        // ✅ CORRECT REDIRECT LOGIC
        if (isBirthdayToday(dob)) {
          window.location.href = "TodayBirthday.html";
        } else {
          window.location.href = "countDownBirthDays.html";
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("User already registered. Please sign in.");
        } else {
          alert(error.message);
        }
      });
  });

  // GO TO SIGN IN
  document.getElementById("goToLogin").addEventListener("click", () => {
    window.location.href = "SigninPage.html";
  });

});

// BIRTHDAY CHECK
function isBirthdayToday(dob) {
  // dob format: YYYY-MM-DD
  const [year, month, day] = dob.split("-").map(Number);

  const today = new Date();
  const todayMonth = today.getMonth() + 1; // JS months are 0-based
  const todayDay = today.getDate();

  return month === todayMonth && day === todayDay;
}


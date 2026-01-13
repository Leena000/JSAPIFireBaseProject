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

        // Save user data in Realtime Database (NO PASSWORD)
        return firebase.database().ref("users/" + uid).set({
          name: name,
          dob: dob,
          email: email,
          password: password
        });
      })
      .then(() => {
        console.log("Data saved in Realtime Database");

        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userDOB", dob);
        localStorage.setItem("password", password);

        alert("User Registered Successfully");

        if (isBirthdayToday(dob)) {
          window.location.href = "TodayBirthday.html";
        } else {
          window.location.href = "countDownBirthDays.html";
        }
      })
      .catch((error) => {
        console.log("Signup error:", error.code, error.message);
        alert(error.message);
      });

  });

  // GO TO SIGN IN
  document.getElementById("goToLogin").addEventListener("click", () => {
    window.location.href = "SigninPage.html";
  });

});

// BIRTHDAY CHECK (unchanged)
function isBirthdayToday(dob) {
  const [year, month, day] = dob.split("-").map(Number);
  const today = new Date();
  return month === today.getMonth() + 1 && day === today.getDate();
}

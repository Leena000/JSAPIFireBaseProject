document.addEventListener("DOMContentLoaded", () => {

  const nameInput = document.getElementById("name");
  const dobInput = document.getElementById("dob");
  const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");
  const btn = document.getElementById("mainBtn");

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const dob = dobInput.value;
    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    if (!name || !dob || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // same logic as your other program
    const userRef = firebase.database().ref("birthdayUsers").push();
    userRef.set({
      name: name,
      dob: dob,
      email: email,
      password: password
    })
    .then(() => {
      alert("SignUp is successful");

      if (isBirthdayToday(dob)) {
        window.location.href = "TodayBirthday.html";
      } else {
        window.location.href = "countDownBirthDays.html";
      }
    })
    .catch(() => {
      alert("Error saving data");
    });
  });

  document.getElementById("goToLogin").addEventListener("click", () => {
    window.location.href = "SigninPage.html";
  });

});

// birthday check
function isBirthdayToday(dob) {
  const [y, m, d] = dob.split("-").map(Number);
  const today = new Date();
  return m === today.getMonth() + 1 && d === today.getDate();
}

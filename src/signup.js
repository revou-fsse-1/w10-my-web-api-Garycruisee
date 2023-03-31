const usersUrl = "https://642556059e0a30d92b2f08bd.mockapi.io/users/";
const usersData = localStorage.getItem("users");
const users = JSON.parse(usersData) || [];
localStorage.setItem("users", JSON.stringify(users));

// Sign Up

function signupBtn() {
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  if (emailInput.value.length == 0) {
    alert("Please fill in email");
  } else if (passwordInput.value.length == 0) {
    alert("Please fill in password");
  } else if (emailInput.value.length == 0 && passwordInput.value.length == 0) {
    alert("Please fill in email and password");
  } else {
    localStorage.setItem("email", emailInput.value);
    localStorage.setItem("password", passwordInput.value);
    alert("Your account has been created");
  }
}

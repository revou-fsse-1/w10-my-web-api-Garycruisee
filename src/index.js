const usersUrl = "https://642556059e0a30d92b2f08bd.mockapi.io/users/";

// Sign In

function loginBtn() {
  var storedName = localStorage.getItem("email");
  var storedPw = localStorage.getItem("password");

  var userName = document.getElementById("email-sign");
  var userPw = document.getElementById("password-sign");

  if (userName.value == storedName && userPw.value == storedPw) {
    window.location.href = "homepage.html";
    alert("You are logged in.");
  } else {
    alert("Error on login");
  }
}

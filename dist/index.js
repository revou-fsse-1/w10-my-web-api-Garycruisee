const usersUrl = "https://642556059e0a30d92b2f08bd.mockapi.io/users/";

async function loginBtn() {
  const username = document.getElementById("email-sign").value;
  console.log(username);
  const userPassword = document.getElementById("password-sign").value;
  console.log(userPassword);

  if (!username) {
    alert("Please input your username");
  } else if (!userPassword) {
    alert("Please input your password");
  } else {
    try {
      const response = await fetch(usersUrl);
      const user = await response.json();
      if (user[0].password == userPassword) {
        alert("success!");
        window.location.href = "homepage.html";
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid username or password!");
    }
  }
}

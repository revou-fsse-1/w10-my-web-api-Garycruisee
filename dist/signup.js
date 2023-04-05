const usersUrl = "https://642556059e0a30d92b2f08bd.mockapi.io/users/";
// Sign Up

async function signupBtn() {
  const emailReg = document.getElementById("email-input").value;
  console.log(emailReg);
  const passwordReg = document.getElementById("password-input").value;
  console.log(passwordReg);

  if (!usernameReg) {
    alert("Please input your username");
  } else if (!emailReg) {
    alert("Please input your email");
  } else if (!passwordReg) {
    alert("Please input your password");
  } else {
    try {
      const response = await fetch(usersUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameReg,
          emailReg,
          passwordReg: rePasswordReg,
        }),
      });
      const newUser = await response.json();
      alert(`Successfully registered with ID ${newUser.id}`);
      // Redirect to login page after successful registration
      window.location.href = "index.html";
    } catch (error) {
      console.log(error);
      alert("Error registering user");
    }
  }
}

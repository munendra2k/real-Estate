function showPassword() {
  let inputPassword = document.getElementById("password");
  if (inputPassword.type === "password") {
    inputPassword.type = "text";
  } else {
    inputPassword.type = "password";
  }
}

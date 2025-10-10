const passwordInput = document.getElementById("secretPass");
const eyeIcon = document.getElementById("secretEyeIcon");

eyeIcon.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.style.color = "var(--text-color2)";
  } else {
    passwordInput.type = "password";
    eyeIcon.style.color = "var(--bg-dark)";
  }
});

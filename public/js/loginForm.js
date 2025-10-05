const passwordInput = document.getElementById("loginpasswordInput");
const eyeIcon = document.getElementById("logineyeIcon");

eyeIcon.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.style.color = "var(--text-color2)";
  } else {
    passwordInput.type = "password";
    eyeIcon.style.color = "var(--bg-dark)";
  }
});

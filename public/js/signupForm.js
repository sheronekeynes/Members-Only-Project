const passwordInput = document.getElementById("passwordInput");
const eyeIcon = document.getElementById("eyeIcon");

const confirmpasswordInput = document.getElementById("confirmpasswordInput");
const eyeIcon2 = document.getElementById("eyeIcon2");

eyeIcon.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.style.color = "var(--text-color2)";
  } else {
    passwordInput.type = "password";
    eyeIcon.style.color = "var(--bg-dark)";
  }
});

eyeIcon2.addEventListener("click", () => {
  if (confirmpasswordInput.type === "password") {
    confirmpasswordInput.type = "text";
    eyeIcon2.style.color = "var(--text-color2)";
  } else {
    confirmpasswordInput.type = "password";
    eyeIcon2.style.color = "var(--bg-dark)";
  }
});

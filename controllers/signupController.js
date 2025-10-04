require("dotenv").config();

async function showSignupForm(req, res) {
  res.render("SignupForm");
}

module.exports = {
  showSignupForm,
};

require("dotenv").config();

async function showSignupForm(req, res) {
  res.render("signupForm");
}

module.exports = {
  showSignupForm,
};

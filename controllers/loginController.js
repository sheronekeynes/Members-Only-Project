require("dotenv").config();

async function showLoginForm(req, res) {
  res.render("LoginForm");
}

module.exports = {
  showLoginForm,
};

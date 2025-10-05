require("dotenv").config();
const bcrypt = require("bcrypt");
const queries = require("../db/queries.js");

async function showSignupForm(req, res) {
  res.render("SignupForm");
}

async function registerUser(req, res) {

  const { fullname, username, password, confirmpassword } = req.body;

  // validation
  if (
    fullname == "" ||
    username == "" ||
    password == "" ||
    confirmpassword == ""
  ) {
    res.status(400);
    res.redirect("/signup");
    return;
  }
  let hashedPassword = null;
  if (password === confirmpassword) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  await queries.registerUsertoDB(
    fullname,
    username,
    hashedPassword,
    "false",
    "false"
  );

  res.redirect("/login");
}

module.exports = {
  showSignupForm,
  registerUser,
};

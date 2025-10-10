require("dotenv").config();
const bcrypt = require("bcrypt");
const queries = require("../db/queries.js");

async function showSignupForm(req, res) {
  res.render("SignupForm", { errorMsg: null });
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

  try {
    await queries.registerUsertoDB(
      fullname,
      username,
      hashedPassword,
      "false",
      "false"
    );
    res.redirect("/login");
  } catch (err) {
    if (err.message.includes("Username already exists")) {
      res.render("signupForm", {
        errorMsg: "Username already taken. Try another.",
      });
    } else {
      console.error(err);
      res.render("signupForm", { errorMsg: "Something went wrong." });
    }
  }
}

module.exports = {
  showSignupForm,
  registerUser,
};

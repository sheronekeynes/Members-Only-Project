require("dotenv").config();
const passport = require("passport");

const bcrypt = require("bcrypt");
const queries = require("../db/queries.js");

async function showLoginForm(req, res) {
  res.render("LoginForm");
}

async function checkUserDetail(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
}

module.exports = {
  showLoginForm,
  checkUserDetail,
};

require("dotenv").config();
const bcrypt = require("bcrypt");
const queries = require("../db/queries.js");

async function showLoginForm(req, res) {
  res.render("LoginForm");
}

async function checkUserDetail(req, res) {
  console.log(req.body);

  const {username , password} = req.body;

  

  res.send('done')
}

module.exports = {
  showLoginForm,
  checkUserDetail,
};

const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController.js");

router.get("/", (req, res) => {
  res.render("HomePage");
});

router.get("/signup", signupController.showSignupForm);

module.exports = router;

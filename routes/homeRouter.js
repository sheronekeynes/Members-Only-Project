const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController.js");
const loginController = require("../controllers/loginController.js");

router.get("/", (req, res) => {
  res.render("HomePage");
});

router.get("/signup", signupController.showSignupForm);

router.post("/signup", signupController.registerUser);

router.get("/login", loginController.showLoginForm);

router.post("/login", loginController.checkUserDetail);

module.exports = router;

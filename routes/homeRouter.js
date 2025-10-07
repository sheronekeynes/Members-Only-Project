const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController.js");
const loginController = require("../controllers/loginController.js");

router.get("/", (req, res) => {
  console.log(req.user);
  res.render("HomePage");
});

function redirectIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
}

router.get("/signup", redirectIfAuthenticated, signupController.showSignupForm);

router.post("/signup", signupController.registerUser);

router.get("/login", redirectIfAuthenticated, loginController.showLoginForm);

router.post("/login", loginController.checkUserDetail);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;

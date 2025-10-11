const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController.js");
const loginController = require("../controllers/loginController.js");
const joinController = require("../controllers/joinController.js");
const queries = require("../db/queries.js");

router.get("/", async (req, res) => {
  const userMessageDetails = await queries.getUsersMessage();

  res.render("HomePage", { userMessageDetails });
});

function redirectIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
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

router.get("/join", ensureAuthenticated, joinController.showJoinForm);

router.post("/join", ensureAuthenticated, joinController.joinClub);

router.post("/", async (req, res) => {
  console.log(req.body);
  const { textContent, userId } = req.body;
  await queries.addMessage(textContent, userId);
  res.redirect("/");
});

module.exports = router;

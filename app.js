const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const queries = require("./db/queries.js");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// routes
const homeRouter = require("./routes/homeRouter.js");

// middlewares
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

// set engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// configure session middelware
app.use(
  session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();

  next();
});

app.use(flash());

app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  next();
});

// configure local strategy for passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await queries.findUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return done(null, false, { message: "Incorrect password" });
      }
      //success
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.username);
});

// deserialize user from the session
passport.deserializeUser(async (username, done) => {
  const user = await queries.findUserByUsername(username);
  done(null, user);
});

app.use("/", homeRouter);

// app.listen(port, (error) => {
//   if (error) {
//     console.log("oops something went wrong", error);
//     return;
//   }
//   console.log("Server listening in port: ", port);
// });

module.exports = app;

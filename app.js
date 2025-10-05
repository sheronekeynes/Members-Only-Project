const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const queries = require("./db/queries.js");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

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

app.use("/", homeRouter);

app.listen(port, (error) => {
  if (error) {
    console.log("oops something went wrong", error);
    return;
  }
  console.log("Server listening in port: ", port);
});

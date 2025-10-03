const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

// middlewares
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// set engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("HomePage");
});

app.listen(port, (error) => {
  if (error) {
    console.log("oops something went wrong", error);
    return;
  }
  console.log("Server listening in port: ", port);
});

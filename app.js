const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

// routes
const homeRouter = require("./routes/homeRouter.js");

// middlewares
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// set engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", homeRouter);

app.listen(port, (error) => {
  if (error) {
    console.log("oops something went wrong", error);
    return;
  }
  console.log("Server listening in port: ", port);
});

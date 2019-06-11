var path = require("path");
var express = require("express");
var cookieParser = require("cookie-parser");
const mustacheExpress = require("mustache-express");

const app = express();
app.use(cookieParser());
app.engine("html", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  return res.render("index.html");
});

app.get("/iframe", (req, res) => {
  return res.render("hello.html");
});

app.get("/another", (req, res) => {
  return res.render("another.html");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

var path = require("path");
var express = require("express");
var mustacheExpress = require("mustache-express");

const app = express();
app.engine("html", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

app.get("/", (_, res) => {
  res.render("index.html");
});

var port = process.env.PORT || 5003;
app.listen(port, function() {
  console.log("Listening on " + port);
});

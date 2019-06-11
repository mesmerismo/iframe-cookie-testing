var path = require("path");
var express = require("express");
var cookieParser = require("cookie-parser");
const mustacheExpress = require("mustache-express");

const app = express();
app.use(cookieParser());
app.engine("html", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

/*
  Escenario 1 describe la funcionalidad actual.
  La web carga un iframe de dominio distinto al actual
  que intenta guardar una cookie.
  El navegador bloquea este intento si tiene
  deshabilitadas las cookies de terceros.
*/
app.get("/escenario/1", function(req, res) {
  res.render("escenario1.html");
});

/*
  Escenario 2 intenta sobrepasar la restricción de cookies
  haciendo una redirección primero a una URL del otro dominio
  de forma que este pueda guardar la cookie como "first-party".
  Una vez hecho esto, se redirige a Escenario 1 donde el iframe
  debería ser capaz de leer la cookie.
*/
app.get("/escenario/2", (req, res) => {
  var url = "http://herma.test:5001/escenario/2/1";
  res.redirect(
    `http://herma.test:5000/set-cookie?cb=${encodeURIComponent(url)}`
  );
});

app.get("/escenario/2/1", function(req, res) {
  res.render("escenario2.html");
});

/*
  Escenario 3 intenta sobrepasar la restricción de cookies
  mediante una redirección dentro de una nueva ventana.
  Esta ventana establece la cookie como "first-party" y
  después se cierra. El iframe original es capaz entonces
  de acceder a la cookie establecida de esta forma.
*/
app.get("/escenario/3", (req, res) => {
  res.render("escenario3.html");
});

var port = process.env.PORT || 5001;
app.listen(port, function() {
  console.log("Listening on " + port);
});

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const mustacheExpress = require("mustache-express");
const cors = require("cors");

const COOKIE_NAME = "my-cookie";

const app = express();
app.use(cookieParser());
app.use(cors());
app.engine("html", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

app.get("/set-cookie", (req, res) => {
  const { cb: callbackUrl = "/escenario/1" } = req.query;
  res
    .cookie(COOKIE_NAME, "This is a cookie message", {
      domain: ".herma.test",
      httpOnly: false /* Accessible to JS */,
      secure: false /* Allow HTTP */,
      sameSite: true /* Must be same domain */,
      maxAge: 1000 * 60 * 60 * 24 /* Expires in 24 h */
    })
    .redirect(callbackUrl);
});

/*
  Escenario 1 describe la funcionalidad actual.
  La web carga un iframe de dominio distinto al actual
  que intenta guardar una cookie.
  El navegador bloquea este intento si tiene
  deshabilitadas las cookies de terceros.
*/
app.get("/escenario/1", (req, res) => {
  const myCookie = req.cookies[COOKIE_NAME];
  const cookieMessage =
    myCookie != null ? myCookie : "Cookie my-cookie was not set";

  res.render("escenario1.html", { cookieMessage });
});

/*
  Escenario 2 intenta sobrepasar la restricción de cookies
  haciendo una redirección primero a una URL del otro dominio
  de forma que este pueda guardar la cookie como "first-party".
  Una vez hecho esto, se redirige a Escenario 1 donde el iframe
  debería ser capaz de leer la cookie.
*/
app.get("/escenario/2", (req, res) => {
  const myCookie = req.cookies[COOKIE_NAME];
  const cookieMessage =
    myCookie != null ? myCookie : "Cookie my-cookie was not set";

  res.render("escenario2.html", { cookieMessage });
});

/*
  Escenario 3 intenta sobrepasar la restricción de cookies
  mediante una redirección dentro de una nueva ventana.
  Esta ventana establece la cookie como "first-party" y
  después se cierra. El iframe original es capaz entonces
  de acceder a la cookie establecida de esta forma.
*/
app.get("/escenario/3", (req, res) => {
  const myCookie = req.cookies[COOKIE_NAME];
  const cookieMessage = myCookie != null ? "Yes!" : "Nope";
  res.render("escenario3.html", { cookieMessage });
});

app.get("/escenario/3/1", (req, res) => {
  res.render("escenario3.1.html");
});

app.get("/check-cookie", (req, res) => {
  const myCookie = req.cookies[COOKIE_NAME];
  res.send(JSON.stringify({ myCookie }));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

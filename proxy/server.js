const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const mustacheExpress = require("mustache-express");
const axios = require("axios");

const app = express();
app.use(cookieParser());
app.engine("html", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

/*
  El escenario 4 intenta resolver el problema de las cookies
  estableciendo un proxy intermedio que permita realizar
  el manejo de las cookies sin pasar por navegador
*/
app.get("/escenario/4", async (_, res) => {
  try {
    var cookie = await getCookie();
  } catch (error) {
    return res.status(error.status).send(error.data);
  }

  if (!cookie) {
    return res.status(500).send("No cookie found");
  }

  try {
    var page = await getPage(cookie);
  } catch (error) {
    return res.status(error.status).send(error.data);
  }

  return res.send(page);
});

app.get("/escenario/5", (_, res) => {
  res.render("escenario5.html");
});

async function getCookie() {
  try {
    var cookieResponse = await axios.get("http://localhost:5000/set-cookie", {
      maxRedirects: 0
    });
  } catch (error) {
    const { status } = error.response;
    if (status >= 300 && status < 400) {
      // Redirect
      cookieResponse = error.response;
    } else {
      throw error;
    }
  }

  return cookieResponse.headers["set-cookie"];
}

async function getPage(cookie) {
  var pageResponse = await axios.get("http://herma.test:5000/escenario/1", {
    headers: { cookie }
  });

  return pageResponse.data;
}

var port = process.env.PORT || 5002;
app.listen(port, function() {
  console.log("Listening on " + port);
});

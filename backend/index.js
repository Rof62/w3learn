const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const port = 8003;

require("./database");

const routes = require("./routes")


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(routes)

app.listen(port, () => {
  console.log(`serveur Node écoutant sur le port ${port}`);
});

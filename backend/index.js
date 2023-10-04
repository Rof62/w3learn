const express = require("express");
// const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(cors());

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

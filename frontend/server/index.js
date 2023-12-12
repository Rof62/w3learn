const express = require("express");
const cookie = require("cookie-parser");
require("dotenv").config();
// const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

app.use(cookie());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(cors());

const port = process.env.PORT || 8003;

require("./database");

const routes = require("./routes")


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(routes)

app.use("*", (req, res) => {
  res.status(404).end();
});

app.listen(port, "0.0.0.0", () => {
  console.log(`serveur Node écoutant sur le port ${port}`);
});

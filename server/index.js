const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const manager = require("./cron/manager");
const coinDataManager = manager.CreateCoinDataManager();
const { PORT, COIN_API } = require("./config");

app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(express.static(path.join(__dirname, "./../build")));

app.set("/static", path.join(__dirname, "./../build/static"));

app.get("/", (req, res) => res.render("./../build/index"));

app.get("/api/getCoins", async (req, res) => {
  const coinsData = coinDataManager.getCoins();
  const coinApi = COIN_API;
  const coins = await coinsData.map(async (coin) => {
    const res = await coinDataManager.getCoin(coin.name, coinApi, "ticker");
    return { ...res, ...{ rate: coin.api[coinApi], coin: coin.name, exchange: coinApi } };
  });
  const values = await Promise.all(coins).then((val) => val);
  res.status(200).send(values);
});
app.get("/api/getHistory", async (req, res) => {
  const coinsData = coinDataManager.getCoins();
  const coinApi = COIN_API;
  const coins = await coinsData.map(async (coin) => {
    const res = await coinDataManager.getCoin(coin.name, coinApi, "history");
    return { rate: coin.api[coinApi], coin: coin.name, exchange: coinApi, history: res };
  });
  const values = await Promise.all(coins).then((val) => val);
  res.status(200).send(values);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./404.html"));
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

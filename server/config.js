const DEFAULT_EXPIRATION = 3600; // 1h
const REDIS_ADDRESS = process.env.REDIS_ADDRESS || "localhost";
const COIN_API = "bitstamp";
const PORT = process.env.PORT || 5000;

const ApiBaseUrls = {
  bitstamp: "https://www.bitstamp.net/api/v2/",
};

const ApiTickerPaths = {
  bitstamp: "ticker/",
};

const ApiHistoryPaths = {
  bitstamp: "ohlc/",
};

const coinConfig = [
  {
    name: "btc",
    api: {
      bitstamp: "btcusd",
    },
    apiHistory: {
      bitstamp: `btcusd?step=${DEFAULT_EXPIRATION}&limit=1000`,
    },
  },
  {
    name: "ltc",
    api: {
      bitstamp: "ltcusd",
    },
    apiHistory: {
      bitstamp: `ltcusd?step=${DEFAULT_EXPIRATION}&limit=1000`,
    },
  },

  {
    name: "eth",
    api: {
      bitstamp: "ethusd",
    },
    apiHistory: {
      bitstamp: `ethusd?step=${DEFAULT_EXPIRATION}&limit=1000`,
    },
  },
];

module.exports = {
  DEFAULT_EXPIRATION,
  REDIS_ADDRESS,
  COIN_API,
  PORT,
  coinConfig,
  ApiHistoryPaths,
  ApiTickerPaths,
  ApiBaseUrls,
};

const redis = require("redis");
const { promisify } = require("util");
const { DEFAULT_EXPIRATION, REDIS_ADDRESS } = require("../config");

const FetchApiResolution = {
  bitstamp: {
    history: (response) => response.data["ohlc"],
    ticker: (response) => response,
  },
};

class CoinDataBaseManager {
  constructor(address = REDIS_ADDRESS) {
    this.redisClient = redis.createClient({ host: address, address: address });
    this.getAsync = promisify(this.redisClient.get).bind(this.redisClient);
  }

  async saveCoinRate(coinName, apiName, response) {
    const savePathRedis = this.getTickerSaveKey(coinName, apiName);
    const currentRate = this.getResponseData(response, apiName, "ticker");
    console.log(`Saving ${coinName} coin rate...`);
    await this.saveDataBase(savePathRedis, currentRate);
  }

  async saveHistoryRate(coinName, apiName, response) {
    const savePathRedis = this.getHistorySaveKey(coinName, apiName);
    const historyRate = this.getResponseData(response, apiName, "history");
    console.log(`Saving ${coinName} coin history...`);
    await this.saveDataBase(savePathRedis, historyRate);
  }

  getHistorySaveKey(coinName, apiName) {
    return this.getSaveCoinKey(coinName, apiName, "history");
  }
  getTickerSaveKey(coinName, apiName) {
    return this.getSaveCoinKey(coinName, apiName, "ticker");
  }
  getSaveCoinKey(coinName, apiName, resolution) {
    return `${coinName}-${apiName}-${resolution}`;
  }

  getResponseData(responseRaw, apiName, ApiFetchName) {
    const isApiFetchData = apiName in FetchApiResolution && ApiFetchName in FetchApiResolution[apiName];
    if (!isApiFetchData) {
      return responseRaw;
    }
    const data = FetchApiResolution[apiName][ApiFetchName](responseRaw);
    return data;
  }

  async saveDataBase(key, data, time = DEFAULT_EXPIRATION) {
    const stringValue = JSON.stringify(data);
    const didSaveSuccessfully = await this.redisClient.setex(key, time, stringValue);
    if (didSaveSuccessfully === true) {
      console.log(`Saved ${key} key successfully`);
    } else {
      console.log(`<<< ERROR SAVE ${key} key >>>`);
    }
    return didSaveSuccessfully;
  }

  async getCoin(coinName, apiName, resolution) {
    const key = this.getSaveCoinKey(coinName, apiName, resolution);
    const value = this.getKeyDataBase(key);
    return value;
  }
  async getKeyDataBase(key) {
    return this.getAsync(key)
      .then((stringValue) => {
        const data = JSON.parse(stringValue);
        return data;
      })
      .catch(console.error);
  }
}

module.exports = CoinDataBaseManager;

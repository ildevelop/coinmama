const axios = require("axios");
const CoinDataBaseManager = require("../db/database");

const { coinConfig, ApiBaseUrls, ApiTickerPaths, ApiHistoryPaths } = require("../config");

class CoinDataManager {
  constructor() {
    this.dbManager = new CoinDataBaseManager();
  }

  getCoins() {
    return coinConfig;
  }

  async syncHistoryCoin(coin) {
    for (const [apiName, historyPath] of Object.entries(coin.apiHistory)) {
      const historyRate = await this.getHistoryRates(apiName, historyPath);
      this.dbManager.saveHistoryRate(coin.name, apiName, historyRate);
    }
  }

  async syncTickerCoin(coin) {
    for (const [apiName, apiPath] of Object.entries(coin.api)) {
      const currentRate = await this.getCurrentRate(apiName, apiPath);
      this.dbManager.saveCoinRate(coin.name, apiName, currentRate);
    }
  }

  async getHistoryRates(apiName, historyPath) {
    const historyUrl = this.getHistoryUrl(apiName, historyPath);
    const response = await this.fetchUrl(historyUrl);
    return response;
  }

  async getCurrentRate(apiName, apiPath) {
    const url = this.getTickerUrl(apiName, apiPath);
    const response = await this.fetchUrl(url);
    return response;
  }

  getHistoryUrl(apiName, apiPath) {
    const apiUrl = ApiBaseUrls[apiName];
    const baseHistoryPath = ApiHistoryPaths[apiName];
    const url = `${apiUrl}${baseHistoryPath}${apiPath}`;
    return url;
  }

  getTickerUrl(apiName, apiPath) {
    const apiUrl = ApiBaseUrls[apiName];
    const tickerPath = ApiTickerPaths[apiName];
    const url = `${apiUrl}${tickerPath}${apiPath}`;
    return url;
  }

  async getCoin(coinName, apiName, resolution) {
    return await this.dbManager.getCoin(coinName, apiName, resolution);
  }

  async fetchUrl(url) {
    const response = await axios.get(url);
    return response.data;
  }
}

const CreateCoinDataManager = () => {
  return new CoinDataManager();
};
const manager = { CreateCoinDataManager };

module.exports = manager;

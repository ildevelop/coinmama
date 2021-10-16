const CronJob = require("cron").CronJob;

const manager = require("./manager");
const DEFAULT_TIME = 1;
const coinDataManager = manager.CreateCoinDataManager();

const initialCoins = () => {
  console.log("Starting initializing...");
  coinDataManager.getCoins().forEach((coin) => {
    console.log(`Syncing ${coin.name} coin ...`);
    coinDataManager.syncHistoryCoin(coin);
    console.log(`Done initializing ${coin.name} coin`);
  });
};

const syncCoins = () => {
  const result = coinDataManager.getCoins().map((coin) => {
    console.log(`Syncing ${coin.name} coin ...`);
    try {
      coinDataManager.syncTickerCoin(coin);
      console.log(`Done Syncing ${coin.name} coin`);
    } catch (error) {
      console.log(error);
    }
    return coin;
  });
  console.log(`Finished Job Syncing ${result.length} coins`);
};

const jobConfig = {
  cronTime: `${DEFAULT_TIME} * * * * *`,
  onTick: async () => {
    try {
      syncCoins();
    } catch (error) {
      console.log(error);
    }
  },
  runOnInit: true,
  onComplete: () => {
    console.log("Finished!");
  },
};

initialCoins();

const job = new CronJob(jobConfig);
job.start();

module.exports = { syncCoins };

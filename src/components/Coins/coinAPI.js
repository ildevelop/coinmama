import axios from "axios";
const PATH = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

function getCoins() {
  return axios.get(`${PATH}/api/getCoins`);
}
function getHistory() {
  return axios.get(`${PATH}/api/getHistory`);
}
const Api = {
  getCoins,
  getHistory,
};
export default Api;

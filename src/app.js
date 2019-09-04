const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const log = console.log;

geocode("São Paulo", (error, data) => {
  log("Error:", error);
  log("Data:", data);
});

forecast(-75.7088, 44.1545, (error, data) => {
  log("Error:", error);
  log("Data:", data);
});

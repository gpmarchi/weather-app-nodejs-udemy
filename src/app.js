const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const log = console.log;

const searchLocation = process.argv[2];

if (!searchLocation) {
  return log("Please provide a valid location to get the forecast.");
}

geocode(searchLocation, (error, { latitude, longitude, location }) => {
  if (error) {
    return log(error);
  }

  forecast(latitude, longitude, (error, forecastData) => {
    if (error) {
      return log(error);
    }

    log(location);
    log(forecastData);
  });
});

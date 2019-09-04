const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    `https://api.darksky.net/forecast/dab971a1b8079138a2056658968556ce/${latitude},` +
    `${longitude}?units=si&exclude=minutely,hourly,alerts,flags`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback(
        "Unable to find location provided or invalid query format!",
        undefined
      );
    } else {
      const currentlyWeatherData = response.body.currently;
      const dailyWeatherData = response.body.daily;
      callback(
        undefined,
        `${dailyWeatherData.data[0].summary} It is currently ${
          currentlyWeatherData.temperature
        } degrees out. There is a ${currentlyWeatherData.precipProbability *
          100}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;

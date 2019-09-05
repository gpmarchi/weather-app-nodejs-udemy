const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    `https://api.darksky.net/forecast/dab971a1b8079138a2056658968556ce/${latitude},` +
    `${longitude}?units=si&exclude=minutely,hourly,alerts,flags`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(
        "Unable to find location provided or invalid query format!",
        undefined
      );
    } else {
      const { currently: currentlyWeatherData, daily: dailyWeatherData } = body;
      callback(
        undefined,
        `${dailyWeatherData.data[0].summary} It is currently ${
          currentlyWeatherData.temperature
        } degrees out. There is a ${Math.round(
          currentlyWeatherData.precipProbability * 100
        )}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;

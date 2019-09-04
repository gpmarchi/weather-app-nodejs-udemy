const request = require("request");

const log = console.log;

const weatherUrl =
  "https://api.darksky.net/forecast/dab971a1b8079138a2056658968556ce/-23.616770," +
  "-46.630544?units=si&exclude=minutely,hourly,alerts,flags";

request({ url: weatherUrl, json: true }, (error, response) => {
  if (error) {
    log("Unable to connect to weather service!");
  } else if (response.body.error) {
    log("Unable to find location provided or invalid query format!");
  } else {
    const currentlyWeatherData = response.body.currently;
    const dailyWeatherData = response.body.daily;
    log(
      `${dailyWeatherData.data[0].summary} It is currently ${
        currentlyWeatherData.temperature
      } degrees out. There is a ${currentlyWeatherData.precipProbability *
        100}% chance of rain.`
    );
  }
});

const geolocationUrl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=" +
  "pk.eyJ1Ijoib25ld2FudWkiLCJhIjoiY2swNWthYnlsMDFwODNnbHFleHhvcWRtaiJ9.8XGGG3XurWHT6utJreUOVQ&limit=1";

request({ url: geolocationUrl, json: true }, (error, response) => {
  if (error) {
    log("Unable to connect to geo-location service!");
  } else if (response.body.message || response.body.features.length === 0) {
    log(
      "Unable to find geo-location by search terms provided or invalid query format!"
    );
  } else {
    const longitude = response.body.features[0].center[0];
    const latitude = response.body.features[0].center[1];
    log(
      `The [longitude, latitude] for Los Angeles is [${longitude},${latitude}]`
    );
  }
});

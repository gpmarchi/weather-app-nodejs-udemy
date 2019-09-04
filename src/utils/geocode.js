const request = require("request");

const geocode = (address, callback) => {
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=` +
    "pk.eyJ1Ijoib25ld2FudWkiLCJhIjoiY2swNWthYnlsMDFwODNnbHFleHhvcWRtaiJ9.8XGGG3XurWHT6utJreUOVQ&limit=1";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to geo-location service!", undefined);
    } else if (response.body.message || response.body.features.length === 0) {
      callback(
        "Unable to find geo-location by search terms provided or invalid query format!",
        undefined
      );
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;

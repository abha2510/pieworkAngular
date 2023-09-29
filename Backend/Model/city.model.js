const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lon: Number,
  weatherData: Object
});

const City = mongoose.model('City', CitySchema);

module.exports = City;

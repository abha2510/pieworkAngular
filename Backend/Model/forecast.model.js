const mongoose = require('mongoose');

const ForecastSchema = new mongoose.Schema({
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  },
  daily: [Object], 
  lastUpdated: Date 
});

const Forecast = mongoose.model('Forecast', ForecastSchema);

module.exports = Forecast;

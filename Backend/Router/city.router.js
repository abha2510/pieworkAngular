const express = require('express');
const Cityrouter = express.Router();
const City = require('../Model/city.model');
const axios = require('axios');
require("dotenv").config();

const API_KEY = process.env.API_KEY

Cityrouter.get('/', async (req, res) => {
  const cityName = req.query.city;
  let city = await City.findOne({ name: cityName });

  if (!city) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    city = new City({
      name: cityName,
      lat: response.data.coord.lat,
      lon: response.data.coord.lon,
      weatherData: response.data
    });
    await city.save();
  }
  
  res.json(city.weatherData);
});

Cityrouter.post('/', async (req, res) => {
  const { name, lat, lon, weatherData } = req.body;
  const city = new City({ name, lat, lon, weatherData });
  await city.save();
  res.json({ message: 'City added successfully!' });
});

Cityrouter.delete('/', async (req, res) => {
  const cityName = req.query.city;
  await City.deleteOne({ name: cityName });
  res.json({ message: 'City deleted successfully!' });
});

module.exports = Cityrouter;

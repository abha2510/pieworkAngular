const express = require('express');
const ForecastRouter = express.Router();
const Forecast = require('../Model/forecast.model');
const City = require('../Model/city.model');
const axios = require('axios');

const API_KEY = process.env.API_KEY;

// Fetch forecast data for a city
ForecastRouter.get('/', async (req, res) => {
    const cityName = req.query.city;

    const city = await City.findOne({ name: cityName });
    if (!city) {
        return res.status(404).json({ message: 'City not found' });
    }

    let forecast = await Forecast.findOne({ cityId: city._id });
    
    // Fetch fresh forecast data if it's not in the database or is outdated
    if (!forecast || (new Date() - forecast.lastUpdated)) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`);
        const dailyData = response.data.daily;

        if (forecast) {
            // Update existing forecast data
            forecast.daily = dailyData;
            forecast.lastUpdated = new Date();
            await forecast.save();
        } else {
            // Save new forecast data
            forecast = new Forecast({
                cityId: city._id,
                daily: dailyData,
                lastUpdated: new Date()
            });
            await forecast.save();
        }
    }

    res.json(forecast.daily);
});

module.exports = ForecastRouter;

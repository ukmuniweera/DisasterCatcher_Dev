import WeatherData from '../models/weatherData.js';

export const createWeatherData = async (req, res) => {
  try {
    const { location, current_weather, forecast, last_updated } = req.body;
    const newWeatherData = await WeatherData.create({ location, current_weather, forecast, last_updated });
    res.status(201).json(newWeatherData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getWeatherData = async (req, res) => {
  try {
    const weatherData = await WeatherData.find();
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWeatherDataById = async (req, res) => {
  try {
    const weatherData = await WeatherData.findById(req.params.id);
    if (!weatherData) return res.status(404).json({ message: 'Weather Data not found' });
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateWeatherData = async (req, res) => {
  try {
    const updatedWeatherData = await WeatherData.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedWeatherData) return res.status(404).json({ message: 'Weather Data not found' });
    res.status(200).json(updatedWeatherData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteWeatherData = async (req, res) => {
  try {
    const deletedWeatherData = await WeatherData.findByIdAndDelete(req.params.id);
    if (!deletedWeatherData) return res.status(404).json({ message: 'Weather Data not found' });
    res.status(200).json({ message: 'Weather Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import mongoose, { Schema } from 'mongoose';

// Subschema for forecast data
const forecastSchema = new Schema({
  date: { type: Date, required: true },
  temperature: { type: Number, required: true },
  rainfall: { type: Number, required: true },
  wind_speed: { type: Number, required: true }
});

// Main schema for weather data
const weatherDataSchema = new Schema({
  location: {
    latitude: { type: Number, required: true, min: -90, max: 90 },
    longitude: { type: Number, required: true, min: -180, max: 180 }
  },
  current_weather: { type: String, required: true },
  forecast: [forecastSchema], // Array of forecast objects
  last_updated: { type: Date, required: true }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Geospatial index for location
weatherDataSchema.index({ location: '2dsphere' }); // Enables geospatial queries

// Transform function for cleaner output
weatherDataSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

// Model export
const WeatherData = mongoose.model('WeatherData', weatherDataSchema);
export default WeatherData;

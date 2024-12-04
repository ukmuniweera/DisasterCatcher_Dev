import mongoose, { Schema } from 'mongoose';

// Define the Location schema
const LocationSchema = new Schema({
  current_location: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.length >= 2 && value.length <= 100,
      message: 'Location name must be between 2 and 100 characters.'
    }
  },
  address: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.length >= 5,
      message: 'Address must be at least 5 characters long.'
    }
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180
  },
  geohash: {
    type: String,
    required: false
  }
}, { timestamps: true }); // Automatically manages `createdAt` and `updatedAt`

// Geospatial index for latitude and longitude
LocationSchema.index({ latitude: 1, longitude: 1 }, { name: 'geoIndex' });
LocationSchema.index({ current_location: 1 }, { unique: true }); // Enforce uniqueness for `current_location`

// Reusable transform function
const transformFunction = (doc, ret) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
};

// Apply transform to JSON and object outputs
LocationSchema.set('toJSON', { transform: transformFunction });
LocationSchema.set('toObject', { transform: transformFunction });

// Model creation
const Location = mongoose.model('Location', LocationSchema);

export default Location;

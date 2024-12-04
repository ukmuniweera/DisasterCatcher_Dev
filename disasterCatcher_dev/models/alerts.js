import mongoose, { Schema } from 'mongoose';

// Define the schema for the Alerts collection
const alertSchema = new Schema({
  alert_type: {
    type: String,
    required: true,
    enum: ['disaster', 'warning'], // Define possible alert types
  },
  disaster: {
    type: String,
    required: true,
    enum: ['flood', 'earthquake', 'fire', 'landslide', 'cyclone', 'storm'], // Define possible disaster types
  },
  distance: {
    type: Number,
    required: true,
    min: 0, // Distance should be positive (in kilometers)
  },
  time: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'], // Define priority levels
  },
  read_status: {
    type: Boolean,
    default: false, // Default to false, meaning the alert has not been read
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Optional: Geospatial index if you need to query by location
alertSchema.index({ location: '2dsphere' }); // Only if you're storing location info

// Optional: Transform function to clean up output (remove _id and __v)
alertSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

// Model creation
const Alert = mongoose.model('Alert', alertSchema);
export default Alert;

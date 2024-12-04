import mongoose, { Schema } from 'mongoose';

// Subschema for location
const locationSchema = new Schema({
  latitude: { type: Number, required: true, min: -90, max: 90 },
  longitude: { type: Number, required: true, min: -180, max: 180 }
});

// Main schema for incident reports
const incidentReportSchema = new Schema({
  title: { type: String, required: true, trim: true },
  disaster_category: {
    type: String,
    required: true,
    enum: ['flood', 'fire', 'earthquake', 'landslide', 'cyclone'] // Define disaster types
  },
  description: { type: String, required: true, trim: true },
  location: { type: locationSchema, required: true }, // Use subschema for location
  date_time: { type: Date, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  verified_by: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: [] // Array of user references
  },
  images: {
    type: [String], // Array of URLs
    validate: {
      validator: function (v) {
        return v.every(url => typeof url === 'string' && url.startsWith('http'));
      },
      message: 'All images must be valid URLs'
    },
    required: true
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high']
  },
  response_status: {
    type: String,
    required: true,
    enum: ['pending', 'dispatched', 'resolved']
  }
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt`

// Indexes
incidentReportSchema.index({ disaster_category: 1 });
incidentReportSchema.index({ location: '2dsphere' }); // Geospatial index for location

// Transform output to clean up API responses
incidentReportSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

// Model export
const IncidentReports = mongoose.model('IncidentReports', incidentReportSchema);
export default IncidentReports;

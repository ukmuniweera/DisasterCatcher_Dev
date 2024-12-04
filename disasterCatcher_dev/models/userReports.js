import mongoose, { Schema } from 'mongoose';

// Subschema for location
const locationSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

// Main schema for user reports
const userReportSchema = new Schema({
  title: { type: String, required: true },
  disaster_category: {
    type: String,
    required: true,
    enum: ['flood', 'fire', 'earthquake', 'landslide', 'cyclone'] // Add applicable categories
  },
  description: { type: String, required: true },
  location: { type: locationSchema, required: true },
  date_time: { type: Date, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  images: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.every(url => typeof url === 'string' && url.startsWith('http'));
      },
      message: 'All images must be valid URLs'
    },
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'verified', 'dismissed']
  },
  validations: { type: [Schema.Types.ObjectId], ref: 'User', required: true }
}, { timestamps: true });

// Add a geospatial index for location
userReportSchema.index({ location: '2dsphere' });

// Transform output to hide internal fields
userReportSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

const UserReports = mongoose.model('UserReports', userReportSchema);
export default UserReports;

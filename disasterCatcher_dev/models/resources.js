import mongoose, { Schema } from 'mongoose';

// Subschema for location
const locationSchema = new Schema({
  latitude: { type: Number, required: true, min: -90, max: 90 },
  longitude: { type: Number, required: true, min: -180, max: 180 }
});

// Subschema for contact information
const contactSchema = new Schema({
  phone: { 
    type: String, 
    required: true, 
    validate: {
      validator: function(v) {
        return /^[\d+\s()-]+$/.test(v); // Basic phone number format validation
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  email: { 
    type: String, 
    required: true, 
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v); // Email format validation
      },
      message: props => `${props.value} is not a valid email!`
    }
  }
});

// Main schema for resources
const resourceSchema = new Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['hospital', 'shelter', 'police station', 'fire station', 'clinic'], // Define types of resources
  },
  location: { type: locationSchema, required: true }, // Use location subschema
  contact: { type: contactSchema, required: true },  // Use contact subschema
  availability_status: {
    type: String,
    required: true,
    enum: ['open', 'closed', 'under maintenance'], // Define availability status options
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Optional: Geospatial index for location if you plan to use proximity-based queries
resourceSchema.index({ location: '2dsphere' }); // Enables geospatial queries

// Transform function for cleaner API output
resourceSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

// Model creation
const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;

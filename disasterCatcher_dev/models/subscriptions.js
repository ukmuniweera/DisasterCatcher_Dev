import mongoose, { Schema } from 'mongoose';

// Define the schema for the Subscriptions collection
const subscriptionSchema = new Schema({
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // Reference to `users` collection
    required: true 
  },
  disaster_types: {
    type: [String], // Array of disaster types
    required: true,
    enum: ['flood', 'earthquake', 'fire', 'landslide', 'cyclone'] // Define possible disaster types
  },
  regions: {
    type: [String], // Array of region names
    required: true,
    enum: ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Matara'] // Define possible regions (adjust to your needs)
  },
  notification_frequency: {
    type: String,
    required: true,
    enum: ['instant', 'daily', 'weekly'], // Define notification frequency options
    default: 'instant' // Default to 'instant'
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Transform function for cleaner API output
subscriptionSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

// Model creation
const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;

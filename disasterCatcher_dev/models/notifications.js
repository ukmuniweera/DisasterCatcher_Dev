import mongoose, { Schema } from 'mongoose';

// Define the schema for Notifications collection
const notificationSchema = new Schema({
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // Reference to `users` collection
    required: true 
  },
  message: { 
    type: String, 
    required: true, 
    minlength: [1, 'Message cannot be empty'] // Ensure that message is not empty
  },
  type: { 
    type: String, 
    required: true, 
    enum: ['alert', 'update', 'report validation'], // Define notification types
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['unread', 'read'], // Define status types
    default: 'unread' // Default status is "unread"
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Transform function for cleaner output
notificationSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

// Model creation
const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;

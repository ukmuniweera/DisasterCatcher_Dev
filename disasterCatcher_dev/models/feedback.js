import mongoose, { Schema } from 'mongoose';

// Define the schema for the Feedback collection
const feedbackSchema = new Schema({
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // Reference to `users` collection
    required: true 
  },
  feedback_type: { 
    type: String, 
    required: true, 
    enum: ['app issue', 'report dispute', 'suggestion', 'general feedback'], // Define feedback types
  },
  message: { 
    type: String, 
    required: true, 
    minlength: [5, 'Message must be at least 5 characters long'], // Ensure message has a minimum length
    trim: true // Remove leading/trailing whitespace
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['new', 'reviewed', 'resolved'], // Define status options
    default: 'new' // Default to 'new'
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Transform function for cleaner output
feedbackSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

// Model creation
const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;

import mongoose, { Schema } from 'mongoose';

// Define the schema for Admin Logs collection
const adminLogSchema = new Schema({
  admin_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // Reference to `users` collection
    required: true,
    validate: {
      validator: function(v) {
        return v && v.isVerified === true; // Ensure the user is verified (requires `isVerified` field in `User`)
      },
      message: 'Admin must be a verified user'
    }
  },
  action: { 
    type: String, 
    required: true, 
    enum: ['verified report', 'sent alert', 'deleted report', 'updated status'], // Define possible actions
  },
  description: { 
    type: String, 
    required: true, 
    minlength: [5, 'Description must be at least 5 characters long'], // Ensure description has a minimum length
    trim: true // Remove leading/trailing whitespace
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Transform function for cleaner API output
adminLogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

// Model creation
const AdminLog = mongoose.model('AdminLog', adminLogSchema);
export default AdminLog;

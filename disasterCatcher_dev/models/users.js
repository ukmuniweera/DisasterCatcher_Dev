import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const locationSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ["registered", "verified", "anonymous", "admin"],
    default: "anonymous" },
  location: { type: locationSchema, required: false },
  associated_department: { 
    type: String, 
    required: false, 
    enum: ["Fire Department", "Police", "Disaster Response Team"] 
  },
  verification_status: { type: Boolean, required: false }
}, { timestamps: true });

// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Transform output to hide sensitive fields
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  }
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ type: 1, location: 1 });

const User = mongoose.model('User', userSchema);
export default User;

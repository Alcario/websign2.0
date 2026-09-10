import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  type: { type: String, enum: ['saas', 'custom'], required: true },
  solution: { type: String, trim: true, default: '' },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
  phone: { type: String, required: true, trim: true, maxlength: 60 },
  message: { type: String, trim: true, default: '', maxlength: 2000 },
  status: { type: String, enum: ['new', 'read', 'closed'], default: 'new' },
}, { timestamps: true });

export default mongoose.model('ContactMessage', contactMessageSchema);

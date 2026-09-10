import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true, match: /^[a-z0-9-]+$/ },
  active: { type: Boolean, default: true, index: true },
  order: { type: Number, default: 0, min: 0, index: true },
}, { timestamps: true });

categorySchema.index({ active: 1, order: 1, name: 1 });
export default mongoose.model('Category', categorySchema);

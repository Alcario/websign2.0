import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true, match: /^[a-z0-9-]+$/ },
  icon: { type: String, trim: true, default: '' },
  active: { type: Boolean, default: true, index: true },
  order: { type: Number, default: 0, min: 0, index: true },
}, { timestamps: true });

technologySchema.index({ active: 1, order: 1, name: 1 });
export default mongoose.model('Technology', technologySchema);

import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true, trim: true },
  alt: { type: String, trim: true, default: '', maxlength: 240 },
  order: { type: Number, default: 0 },
}, { _id: true });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true, match: /^[a-z0-9-]+$/, index: true },
  client: { type: String, trim: true, default: '', maxlength: 160 },
  shortDescription: { type: String, required: true, trim: true, maxlength: 300 },
  description: { type: String, required: true, trim: true, maxlength: 12000 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Technology' }],
  coverImage: { type: imageSchema, required: true },
  images: { type: [imageSchema], default: [] },
  year: { type: Number, min: 1990, max: 2100 },
  websiteUrl: { type: String, trim: true, default: '' },
  repositoryUrl: { type: String, trim: true, default: '' },
  featured: { type: Boolean, default: false, index: true },
  published: { type: Boolean, default: false, index: true },
  order: { type: Number, default: 0, index: true },
  metaTitle: { type: String, trim: true, default: '', maxlength: 70 },
  metaDescription: { type: String, trim: true, default: '', maxlength: 170 },
}, { timestamps: true });

projectSchema.index({ published: 1, featured: 1, order: 1, createdAt: -1 });
projectSchema.index({ published: 1, category: 1, order: 1 });
export default mongoose.model('Project', projectSchema);

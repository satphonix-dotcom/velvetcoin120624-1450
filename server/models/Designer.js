import mongoose from 'mongoose';

const designerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  coverImage: {
    type: String,
    required: true
  },
  about: [{
    type: String,
    required: true
  }],
  details: {
    founded: String,
    origin: String,
    creativeDirector: String,
    specialties: String,
    parentCompany: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate products
designerSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'designer'
});

export const Designer = mongoose.model('Designer', designerSchema);
import mongoose from 'mongoose';

const WardrobeItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['tops', 'bottoms', 'dresses', 'accessories', 'outerwear', 'shoes']
  },
  brand: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true,
    enum: ['new', 'like new', 'good', 'fair', 'poor']
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

WardrobeItemSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const WardrobeItem = mongoose.models.WardrobeItem || mongoose.model('WardrobeItem', WardrobeItemSchema);
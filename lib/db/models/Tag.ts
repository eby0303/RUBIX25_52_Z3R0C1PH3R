import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

TagSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Tag = mongoose.models.Tag || mongoose.model('Tag', TagSchema);
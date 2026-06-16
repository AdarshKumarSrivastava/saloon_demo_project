import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Unisex'], default: 'Unisex' },
  duration: { type: String }
});

// Avoid recompiling model in Next.js dev mode
export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);

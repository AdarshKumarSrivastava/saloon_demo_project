import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String }
});

export default mongoose.model('Service', serviceSchema);

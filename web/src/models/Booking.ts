import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  service: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

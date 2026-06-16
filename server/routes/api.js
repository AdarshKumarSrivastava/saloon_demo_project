import express from 'express';
import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

const router = express.Router();

router.get('/services', async (req, res) => {
  try {
    let services = [];
    if (mongoose.connection.readyState === 1) {
       services = await Service.find();
    }
    
    if (services.length === 0) {
      services = [
        { category: 'Hair Artistry', name: 'Master Cut & Style', price: '$150+', description: 'Tailored to your facial structure.' },
        { category: 'Hair Artistry', name: 'Balayage Reimagined', price: '$280+', description: 'Hand-painted dimensional color.' },
        { category: 'Hair Artistry', name: 'Keratin Smoothing', price: '$350', description: 'Frizz-free silk finish.' },
        { category: 'Skin Alchemy', name: 'Bespoke Facial', price: '$180', description: 'Customized clinical skincare.' },
        { category: 'Skin Alchemy', name: 'Liquid Gold Peel', price: '$220', description: 'Resurfacing and illuminating.' },
        { category: 'The Ritual', name: 'Bridal Elegance', price: '$500', description: 'Complete hair and makeup curation.' },
      ];
    }
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/bookings', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newBooking = new Booking(req.body);
      const savedBooking = await newBooking.save();
      res.status(201).json({ success: true, booking: savedBooking });
    } else {
      console.log('Received booking (Mock):', req.body);
      res.status(201).json({ success: true, message: 'Booking received (Mock mode)', data: req.body });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Service from '@/models/Service';

const MOCK_SERVICES = [
  { 
    name: 'Classic Fade', 
    price: '$40', 
    category: 'Hair Artistry', 
    gender: 'Male', 
    description: 'A precision fade with sharp, tailored lines designed specifically for your head shape.',
    servicePlan: 'Includes: Consultation, Shampoo & Condition, Fade & Line-up, Styling Product Application.'
  },
  { 
    name: 'Beard Sculpting', 
    price: '$35', 
    category: 'Grooming', 
    gender: 'Male', 
    description: 'Luxurious hot towel shave and meticulous beard trim to enhance your facial features.',
    servicePlan: 'Includes: Hot Towel Prep, Straight Razor Edge, Length Sculpting, Beard Oil & Balm.'
  },
  { 
    name: 'Balayage Color', 
    price: '$180', 
    category: 'Hair Artistry', 
    gender: 'Female', 
    description: 'Bespoke hand-painted highlights that deliver a seamless, sun-kissed, and natural look.',
    servicePlan: 'Includes: Color Consultation, Custom Painting, Toning & Glaze, Blowout & Style.'
  },
  { 
    name: 'Silk Press', 
    price: '$90', 
    category: 'Styling', 
    gender: 'Female', 
    description: 'Transform natural textures into a sleek, straight, and incredibly shiny finish.',
    servicePlan: 'Includes: Deep Clarifying Wash, Hydration Steam Treatment, Blow Dry, Precision Silk Press.'
  },
  { 
    name: 'Deep Tissue Massage', 
    price: '$120', 
    category: 'The Ritual', 
    gender: 'Unisex', 
    description: 'Targeted, intensive pressure for deep muscle relief and absolute relaxation.',
    servicePlan: 'Includes: Aromatherapy Selection, 60-Minute Targeted Massage, Hot Stone Accent, Organic Oils.'
  },
  { 
    name: 'Luxury Manicure', 
    price: '$65', 
    category: 'The Ritual', 
    gender: 'Unisex', 
    description: 'Detailed cuticle care, shaping, and premium polish for immaculate hands.',
    servicePlan: 'Includes: Soak, Exfoliation, Cuticle Care, Polish Application, Hand Massage.'
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get('gender') || 'Female';

  try {
    await dbConnect();
    const services = await Service.find({ gender: { $in: [gender, 'Unisex'] } });
    
    if (services.length === 0) {
      const filtered = MOCK_SERVICES.filter(s => s.gender === gender || s.gender === 'Unisex');
      return NextResponse.json(filtered);
    }
    
    return NextResponse.json(services);
  } catch (error) {
    const filtered = MOCK_SERVICES.filter(s => s.gender === gender || s.gender === 'Unisex');
    return NextResponse.json(filtered);
  }
}

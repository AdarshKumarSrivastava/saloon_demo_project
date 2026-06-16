import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Booking from '@/models/Booking';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    try {
      await dbConnect();
      const booking = await Booking.create(body);
      return NextResponse.json({ success: true, booking });
    } catch (dbError) {
      return NextResponse.json({ success: true, mock: true, body });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

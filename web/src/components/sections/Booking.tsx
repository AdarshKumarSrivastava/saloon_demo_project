"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGender } from "@/context/GenderContext";

export default function Booking() {
  const { gender } = useGender();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Automatically attach the current gender experience to the booking
    data.gender = gender;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="book" className="py-32 px-6 md:px-16 bg-charcoal text-ivory relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-accent text-gold tracking-widest text-sm uppercase block mb-4">Reservations</span>
          <h2 className="font-display text-4xl md:text-5xl italic font-light text-ivory">Secure Your Time</h2>
          <p className="mt-4 font-body text-ivory/60">Currently booking for the {gender} experience.</p>
        </div>

        {status === "success" ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 border border-gold/30 text-center bg-obsidian/50 rounded-lg"
          >
            <h3 className="font-display text-3xl mb-4 text-gold">Appointment Requested</h3>
            <p className="font-body text-ivory/80">Our concierge will contact you shortly to confirm your bespoke experience.</p>
            <button 
              onClick={() => setStatus("idle")}
              className="mt-8 font-accent text-sm tracking-widest text-ivory hover:text-gold uppercase transition-colors cursor-hover"
            >
              Book Another
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Full Name"
                  className="w-full bg-transparent border-b border-white/20 py-4 font-body text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="relative group">
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-white/20 py-4 font-body text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <input 
                  type="date" 
                  name="date" 
                  required 
                  className="w-full bg-transparent border-b border-white/20 py-4 font-body text-ivory/40 focus:text-ivory focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="relative group">
                <input 
                  type="time" 
                  name="time" 
                  required 
                  className="w-full bg-transparent border-b border-white/20 py-4 font-body text-ivory/40 focus:text-ivory focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div className="relative group">
              <select 
                name="service" 
                required
                defaultValue=""
                className="w-full bg-charcoal border-b border-white/20 py-4 font-body text-ivory focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-ivory/40">Select a Service</option>
                <option value="Haircut">Signature Haircut</option>
                <option value="Color">Color & Styling</option>
                <option value="Treatment">Spa Treatment</option>
                <option value="Consultation">Bespoke Consultation</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="w-full py-5 mt-8 bg-gold text-obsidian font-accent text-sm tracking-[0.2em] uppercase hover:bg-gold-light transition-colors disabled:opacity-50 cursor-hover"
            >
              {status === "loading" ? "Processing..." : "Submit Request"}
            </button>
            
            {status === "error" && (
              <p className="text-red-400 text-center font-body text-sm mt-4">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

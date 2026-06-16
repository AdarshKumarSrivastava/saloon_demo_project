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
    <section id="book" className="py-32 px-6 md:px-16 bg-obsidian text-ivory relative overflow-hidden">
      {/* Decorative Blur Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="font-accent text-gold tracking-widest text-sm uppercase block mb-4">Reservations</span>
          <h2 className="font-display text-5xl md:text-6xl italic font-light text-ivory drop-shadow-lg">Secure Your Time</h2>
          <p className="mt-6 font-body text-ivory/60 max-w-lg mx-auto leading-relaxed">
            Book your bespoke {gender.toLowerCase()} experience. Our specialists will curate every detail of your visit.
          </p>
        </div>

        {status === "success" ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-16 text-center bg-white/[0.02] backdrop-blur-xl border border-gold/20 rounded-2xl shadow-2xl max-w-2xl mx-auto"
          >
            <h3 className="font-display text-4xl mb-4 text-gold">Request Received</h3>
            <p className="font-body text-ivory/80 leading-relaxed mb-8">
              Your appointment request has been securely logged. Our concierge will contact you shortly to confirm your {gender.toLowerCase()} experience.
            </p>
            <button 
              onClick={() => setStatus("idle")}
              className="px-8 py-3 border border-white/20 rounded-full font-accent text-xs tracking-[0.2em] text-ivory hover:border-gold hover:text-gold uppercase transition-all duration-300 cursor-hover"
            >
              Book Another
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto bg-white/[0.02] backdrop-blur-2xl border border-white/5 p-8 md:p-14 rounded-[2rem] shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Full Name"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 font-body text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] transition-all duration-300 shadow-inner"
                />
              </div>
              <div className="relative group">
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="Email Address"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 font-body text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] transition-all duration-300 shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <input 
                  type="date" 
                  name="date" 
                  required 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 font-body text-ivory/40 focus:text-ivory focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] transition-all duration-300 shadow-inner"
                />
              </div>
              <div className="relative group">
                <input 
                  type="time" 
                  name="time" 
                  required 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 font-body text-ivory/40 focus:text-ivory focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] transition-all duration-300 shadow-inner"
                />
              </div>
            </div>

            <div className="relative group">
              <select 
                name="service" 
                required
                defaultValue=""
                className="w-full bg-[#111111] border border-white/10 rounded-xl px-6 py-4 font-body text-ivory focus:outline-none focus:border-gold/50 transition-all duration-300 shadow-inner appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-ivory/40">Select an Experience</option>
                <option value="Haircut">Signature Haircut</option>
                <option value="Color">Color & Styling</option>
                <option value="Treatment">Spa Treatment</option>
                <option value="Consultation">Bespoke Consultation</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className="w-full py-5 mt-6 bg-gradient-to-r from-gold/90 to-gold text-obsidian rounded-xl font-accent text-sm tracking-[0.2em] uppercase hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 cursor-hover"
            >
              {status === "loading" ? "Processing..." : "Confirm Request"}
            </button>
            
            {status === "error" && (
              <p className="text-red-400 text-center font-body text-sm mt-4">Unable to process request. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

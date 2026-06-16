"use client";

import { useGender } from "@/context/GenderContext";

export default function Pricing() {
  const { gender } = useGender();

  const malePricing = [
    { name: "Signature Haircut", price: "$45", desc: "Precision cut, wash, and style." },
    { name: "Beard Sculpting", price: "$35", desc: "Hot towel shave and detailed trim." },
    { name: "Executive Package", price: "$75", desc: "Haircut, beard sculpt, and scalp massage." },
    { name: "Grey Blending", price: "$50", desc: "Subtle color application for a natural look." }
  ];

  const femalePricing = [
    { name: "Women's Haircut", price: "$85", desc: "Consultation, wash, cut, and blowout." },
    { name: "Balayage / Highlights", price: "$180+", desc: "Custom hand-painted color." },
    { name: "Keratin Smoothing", price: "$250", desc: "Frizz-free, sleek hair treatment." },
    { name: "Event Styling", price: "$120", desc: "Updos and glamorous styling." }
  ];

  const pricingData = gender === "Male" ? malePricing : femalePricing;

  return (
    <section id="pricing" className="py-32 px-6 md:px-16 bg-obsidian text-ivory">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-accent text-gold tracking-widest text-sm uppercase block mb-4">Investment</span>
          <h2 className="font-display text-4xl md:text-5xl italic font-light text-ivory">Service Pricing</h2>
          <p className="mt-4 font-body text-ivory/60">Displaying options for our {gender} experience.</p>
        </div>

        <div className="space-y-8">
          {pricingData.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row justify-between md:items-end border-b border-white/10 pb-4 group hover:border-gold/50 transition-colors">
              <div className="mb-2 md:mb-0">
                <h3 className="font-display text-2xl tracking-wide group-hover:text-gold transition-colors">{item.name}</h3>
                <p className="font-body text-sm text-ivory/60 mt-1">{item.desc}</p>
              </div>
              <div className="font-body text-gold text-xl whitespace-nowrap">
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

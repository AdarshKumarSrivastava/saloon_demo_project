"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGender } from "@/context/GenderContext";

interface Service {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export default function Services() {
  const { gender } = useGender();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/services?gender=${gender}`)
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [gender]);

  return (
    <section id="services" className="py-32 px-6 md:px-16 bg-obsidian text-ivory relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-accent text-gold tracking-widest text-sm uppercase block mb-4">Curated Offerings</span>
          <h2 className="font-display text-4xl md:text-5xl italic font-light text-ivory">Signature Services</h2>
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-40"
              >
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key={gender}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {services.map((service, i) => (
                  <motion.div 
                    key={service._id || service.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="group relative border-b border-white/10 pb-8 flex flex-col justify-between hover:bg-white/5 transition-colors p-4 -mx-4 rounded-lg"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-display text-2xl tracking-wide pr-4">{service.name}</h3>
                        <span className="font-body text-gold text-lg shrink-0">{service.price}</span>
                      </div>
                      <p className="font-body text-ivory/80 text-sm leading-relaxed mb-4">{service.description}</p>
                      
                      {service.servicePlan && (
                        <div className="bg-obsidian/50 p-3 rounded border border-white/5">
                          <p className="font-accent text-xs tracking-widest text-gold mb-1 uppercase">Service Plan</p>
                          <p className="font-body text-ivory/60 text-xs leading-relaxed">{service.servicePlan}</p>
                        </div>
                      )}
                    </div>
                    
                    <button className="mt-6 text-left font-accent text-xs tracking-widest text-gold hover:text-white transition-colors cursor-hover uppercase inline-block">
                      Reserve This Experience {">"}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

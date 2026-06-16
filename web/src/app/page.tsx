import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Booking from "@/components/sections/Booking";

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian selection:bg-gold selection:text-obsidian">
      <Cursor />
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <Booking />
      
      {/* Footer */}
      <footer className="py-12 bg-obsidian text-center border-t border-white/5">
        <h2 className="font-accent text-2xl tracking-[0.2em] text-gold mb-6">MAISON ÉCLAT</h2>
        <p className="font-body text-ivory/40 text-sm">© {new Date().getFullYear()} Maison Éclat. All Rights Reserved.</p>
      </footer>
    </main>
  );
}

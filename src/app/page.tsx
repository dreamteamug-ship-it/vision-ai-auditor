"use client";
import React, { useState, useEffect } from 'react';
/** * BULLETPROOF IMPORT: 
 * We use '../lib/supabase' to tell Next.js exactly where the file is 
 * regardless of the '@' alias settings.
 */
import { supabase } from '../lib/supabase';

const HOUSES = {
  BALAJI: { 
    name: "Balaji Manufacturing", 
    color: "#300101", 
    tagline: "Industrial Excellence",
    logo: "B" 
  },
  SINOEV: { 
    name: "Sinoafriq EV Mobility", 
    color: "#000814", 
    tagline: "Sustainable Logistics",
    logo: "S" 
  },
  ALTOVEX: { 
    name: "Altovex Logistics", 
    color: "#0A0A0A", 
    tagline: "Global Distribution",
    logo: "A" 
  }
};

export default function GlobalConglomerateMaster() {
  const [activeHouse, setActiveHouse] = useState('BALAJI');
  const [isAshantiLoading, setIsAshantiLoading] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden text-white font-sans" style={{ backgroundColor: HOUSES[activeHouse].color }}>
      
      {/* SIDE NAVIGATION */}
      <nav className="w-24 border-r border-white/10 flex flex-col items-center py-10 gap-8 bg-black/60 backdrop-blur-xl">
        <div className="mb-10 opacity-40 text-[10px] tracking-[4px] uppercase rotate-90 whitespace-nowrap">Systems Hub</div>
        
        {Object.entries(HOUSES).map(([id, data]) => (
          <button 
            key={id}
            onClick={() => {
              setActiveHouse(id);
              setIsAshantiLoading(false);
            }}
            className={`w-14 h-14 flex items-center justify-center text-xl font-bold transition-all duration-500 border
              ${activeHouse === id 
                ? 'border-[#D4AF37] bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                : 'border-white/10 text-[#D4AF37] hover:border-white/40'}`}
          >
            {data.logo}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-20">
        <div className="absolute top-10 right-10 text-right">
          <div className="text-[10px] tracking-[5px] text-[#D4AF37] opacity-60 uppercase">Nairobi HQ Terminal</div>
          <div className="text-xs font-mono opacity-40">ENCRYPTION: AES-256 ACTIVE</div>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-[#D4AF37] tracking-[15px] text-sm uppercase opacity-70 animate-pulse">
            {HOUSES[activeHouse].tagline}
          </h2>
          <h1 className="text-7xl font-light tracking-[25px] uppercase transition-all duration-1000">
            {HOUSES[activeHouse].name}
          </h1>
        </div>
        
        <div className="mt-20">
          <button 
            onClick={() => setIsAshantiLoading(true)}
            className="group relative px-16 py-6 border border-[#D4AF37] text-[#D4AF37] overflow-hidden transition-all hover:text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
          >
            <span className="relative z-10 tracking-[8px] text-xs font-bold">INITIALIZE ASHANTI AI</span>
            <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>

        {/* ASHANTI AI INTERFACE OVERLAY */}
        {isAshantiLoading && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-10 backdrop-blur-3xl">
             <div className="relative w-full max-w-6xl aspect-video border border-[#D4AF37]/30 bg-zinc-950 shadow-[0_0_100px_rgba(0,0,0,1)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="tracking-[6px] text-[10px] text-[#D4AF37] uppercase">Syncing 8K Stream from {activeHouse} Vault...</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsAshantiLoading(false)}
                  className="absolute -top-12 right-0 text-white/40 hover:text-[#D4AF37] tracking-[3px] text-[10px] transition-colors"
                >
                  [ DISCONNECT TERMINAL ]
                </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}

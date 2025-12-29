"use client";
import React, { useState } from 'react';

const DOCUMENTS = {
  ROLLOUT: { name: "90-Day Investment Plan", pages: 9, ref: "4K-FINAL" },
  BIZ_PLAN: { name: "Structured Business Plan", pages: 52, ref: "JV-2025" },
  CSR: { name: "CSR Kiosk Proposal", pages: 10, ref: "KIOSK-01" },
  LEGAL: { name: "JV Registry & SHA", pages: 52, ref: "LEGAL-SECURE" }
};

export default function BalajiExecutiveOS() {
  const [activeDoc, setActiveDoc] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [directive, setDirective] = useState("Team, Tranche 1 assets are officially isolated. Proceed to Machinary LC verification.");
  const [isAshantiActive, setIsAshantiActive] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-black text-white font-sans overflow-hidden">
      
      {/* 1. LEFT MASTER SIDE PANEL */}
      <nav className="w-24 border-r border-white/10 flex flex-col items-center py-10 z-50 bg-[#050505]">
        <div className="mb-10 text-[8px] tracking-[4px] uppercase rotate-90 opacity-30">Balaji OS</div>
        {Object.entries(DOCUMENTS).map(([key, doc]) => (
          <button 
            key={key}
            onClick={() => setActiveDoc(doc)}
            className={`w-14 h-14 mb-4 flex items-center justify-center text-[10px] font-bold border transition-all
              ${activeDoc?.name === doc.name ? 'border-[#D4AF37] bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'border-white/10 text-[#D4AF37]'}`}
          >
            {key.substring(0,3)}
          </button>
        ))}
        <button onClick={() => setActiveDoc(null)} className="mt-auto opacity-40 hover:opacity-100 text-[10px] uppercase tracking-widest">Home</button>
      </nav>

      {/* 2. DYNAMIC CONTENT ECOSYSTEM */}
      <div className="flex-1 flex flex-col relative">
        
        {/* UPPER SCREEN: THE VISION LAYER (8K / STATIC IMAGE) */}
        <div className="h-1/2 relative bg-zinc-900 border-b border-white/10 overflow-hidden">
          {!activeDoc ? (
            <div className="w-full h-full flex items-center justify-center">
               <p className="tracking-[15px] uppercase opacity-20 text-sm">8K Visual Layer Initialization</p>
               <div className="absolute top-10 right-10 text-right">
                  <p className="text-[#D4AF37] text-[10px] tracking-[4px] uppercase">Nairobi Terminal</p>
                  <p className="text-[10px] opacity-40 font-mono">LIVE: BALAJI MASTER FEED</p>
               </div>
            </div>
          ) : (
            <div className="w-full h-full bg-white flex flex-col p-12 overflow-y-auto text-black">
               <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
                  <h1 className="text-3xl font-serif font-black uppercase italic">{activeDoc.name}</h1>
                  <span className="bg-black text-white px-3 py-1 text-[9px] uppercase tracking-widest">Registry ID: {activeDoc.ref}</span>
               </div>
               <div className="h-[2000px] bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-300">
                  [ Full Scanned Document Viewer : Page 1 to {activeDoc.pages} ]
               </div>
            </div>
          )}
        </div>

        {/* LOWER SCREEN: THE UPDATES DASHBOARD (ADMIN DIRECTIVES) */}
        <div className="h-1/2 p-12 bg-[#080808] flex gap-12 relative">
          
          {/* Executive Summary & Team Directives */}
          <div className="w-2/3 space-y-6">
            <div className="flex items-center gap-4">
               <h3 className="text-[#D4AF37] text-[10px] tracking-[4px] uppercase font-bold">Project Updates Dashboard</h3>
               <button 
                 onClick={() => setIsAdminMode(!isAdminMode)}
                 className="text-[9px] border border-white/20 px-2 py-1 opacity-40 hover:opacity-100 uppercase"
               >
                 {isAdminMode ? "[ Save Changes ]" : "[ Edit Directives ]"}
               </button>
            </div>

            {isAdminMode ? (
              <textarea 
                value={directive} 
                onChange={(e) => setDirective(e.target.value)}
                className="w-full h-40 bg-white/5 border border-[#D4AF37]/30 text-xl font-light p-4 outline-none text-white leading-relaxed"
              />
            ) : (
              <p className="text-2xl font-light text-gray-200 leading-relaxed italic">"{directive}"</p>
            )}

            {/* CALL TO ACTION / SIGN-OFF */}
            <div className="pt-8 flex items-center gap-6 border-t border-white/10 w-fit">
               <div className="w-16 h-16 border-2 border-[#D4AF37] rounded-full flex items-center justify-center opacity-80">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black text-xs">CTO</div>
               </div>
               <div>
                  <p className="text-[10px] uppercase tracking-[3px] font-bold">Approved & Signed</p>
                  <p className="text-sm font-serif italic text-gray-400">Master Admin: DreamteQ Global</p>
               </div>
            </div>
          </div>

          {/* Navigation Guide / Ashanti Quick-Link */}
          <div className="w-1/3 border-l border-white/10 pl-12">
            <h3 className="text-[#D4AF37] text-[10px] tracking-[4px] uppercase font-bold mb-6">System Ecosystem Guide</h3>
            <ul className="text-xs text-gray-500 space-y-4">
               <li className="flex gap-2"><span>[ 90D ]</span> <span>Review the Tranche Disbursement Schedule.</span></li>
               <li className="flex gap-2"><span>[ BIZ ]</span> <span>Analyze Year 1 ROI on Page 46 (Conservative).</span></li>
               <li className="flex gap-2"><span>[ REG ]</span> <span>Authenticate the 45-45-10 JV Registry.</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ASHANTI GOLD PORTAL (Floating) */}
      <div className="fixed bottom-10 right-10">
         <button 
           onClick={() => setIsAshantiActive(!isAshantiActive)}
           className="w-14 h-14 bg-black border-2 border-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]"
         >
            <div className={`w-8 h-8 rounded-full bg-[#D4AF37] ${isAshantiActive ? 'animate-none' : 'animate-pulse'}`}></div>
         </button>
         {isAshantiActive && (
           <div className="absolute bottom-20 right-0 w-80 bg-black border border-[#D4AF37] p-6 rounded-tl-3xl shadow-2xl">
              <p className="text-xs italic text-gray-300">"Ashanti Online. Standing by for data verification on the Balaji business plan. How can I assist, Admin?"</p>
           </div>
         )}
      </div>
    </div>
  );
}

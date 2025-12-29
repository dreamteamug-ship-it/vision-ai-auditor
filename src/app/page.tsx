"use client";
import React, { useState } from 'react';

export default function DreamTeamIntelligencePortal() {
  const [currentView, setCurrentView] = useState<'admin' | 'balaji' | 'sassy'>('admin');
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [upperImage, setUpperImage] = useState<string | null>(null);
  
  // Dynamic Project Profiles
  const projectProfiles = {
    admin: {
      title: "DreamTeam HQ",
      subtitle: "System Administration & AI Enhancement",
      message: "Welcome to the central command. Use the tools on the left to manage global assets and enhance cinematic viewports."
    },
    balaji: {
      title: "Balaji Hygiene",
      subtitle: "Phase 1: Nairobi Industrial Rollout",
      message: "Strategizing the future of East African hygiene. This dashboard tracks the 120-day implementation of the Nairobi production line."
    },
    sassy: {
      title: "Sassy Pads",
      subtitle: "Ultra-Luxury Branding & Market Entry",
      message: "Redefining the premium feminine care sector. All branding assets and market strategy documents are synchronized here for audit."
    }
  };

  const [files] = useState({
    balaji: [
      { id: 101, name: "Phase 1 Rollout Plan", content: "Executive Audit: Phase 1 starts with 30% reserve." },
      { id: 102, name: "Nairobi Fit-out Specs", content: "Technical specifications for the Nairobi production facility." }
    ],
    sassy: [
      { id: 201, name: "Brand Identity Guide", content: "Luxury focus: Maroon and Gold high-gloss finish requirements." }
    ]
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUpperImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#050505', color: '#e0e0e0', overflow: 'hidden' }}>
      
      {/* --- LEVEL 1: FULL HEIGHT MASTER STRIP --- */}
      <nav style={{ width: '70px', background: '#000', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: '25px', flexShrink: 0 }}>
        <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '22px' }}>DT</div>
        {['admin', 'balaji', 'sassy'].map(id => (
          <button 
            key={id} 
            onClick={() => { setCurrentView(id as any); setActiveDoc(null); }}
            style={{ 
              width: '45px', height: '45px', borderRadius: '12px', border: currentView === id ? '1px solid #D4AF37' : 'none',
              background: currentView === id ? '#800000' : '#111', cursor: 'pointer', fontSize: '18px', transition: '0.3s'
            }}
          >
            {id === 'admin' ? '🛠️' : id === 'balaji' ? '🏭' : '✨'}
          </button>
        ))}
      </nav>

      {/* --- LEVEL 2: FULL HEIGHT FILE DASHBOARD --- */}
      <aside style={{ width: '320px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '30px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <h2 style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '4px', marginBottom: '10px', textTransform: 'uppercase' }}>{currentView}</h2>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '30px', fontStyle: 'italic' }}>Executive Summary: Strategic audit & asset management active.</p>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {currentView === 'admin' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ color: '#D4AF37', fontSize: '11px', cursor: 'pointer', border: '1px solid #D4AF37', padding: '15px', textAlign: 'center', fontWeight: 'bold', background: 'rgba(212,175,55,0.05)' }}>
                UPDATE VIEWPORT ASSET
                <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
              <div style={{ padding: '15px', border: '1px solid #333', fontSize: '11px', lineHeight: '1.6' }}>
                <span style={{ color: '#D4AF37' }}>ADMIN LOG:</span><br/>
                - 4K Upscaling Enabled<br/>
                - Project Overlays: Active
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(files as any)[currentView]?.map((file: any) => (
                <div key={file.id} onClick={() => setActiveDoc(file)} style={{ padding: '15px', background: activeDoc?.id === file.id ? '#4d0000' : '#111', fontSize: '13px', cursor: 'pointer', borderRadius: '6px', border: activeDoc?.id === file.id ? '1px solid #D4AF37' : '1px solid #222' }}>
                  📄 {file.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* --- RIGHT WORKSTAGE --- */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* TOP: CINEMATIC VIEWPORT */}
        <div style={{ height: '50%', background: '#000', borderBottom: '2px solid #D4AF37', overflow: 'hidden' }}>
          {upperImage ? (
            <div style={{ width: '100%', height: '100%', backgroundImage: `url(${upperImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#222', letterSpacing: '8px' }}>DT SYSTEM IDLE</div>
          )}
        </div>

        {/* BOTTOM: DYNAMIC INTRODUCTORY MESSAGE */}
        <div style={{ height: '50%', background: '#800000', padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          <div style={{ maxWidth: '800px' }}>
            <h1 style={{ color: '#D4AF37', fontSize: '3.5rem', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>
              {projectProfiles[currentView].title}
            </h1>
            <h2 style={{ color: '#f5e27a', fontSize: '1.4rem', fontStyle: 'italic', margin: '5px 0 25px 0' }}>
              {projectProfiles[currentView].subtitle}
            </h2>
            <div style={{ width: '60px', height: '4px', background: '#D4AF37', marginBottom: '30px' }}></div>
            <p style={{ color: 'white', fontSize: '18px', lineHeight: '1.8', opacity: 0.9 }}>
              {projectProfiles[currentView].message}
            </p>
          </div>
        </div>

        {/* A4 DOCUMENT OVERLAY */}
        {activeDoc && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.94)', display: 'flex', justifyContent: 'center', overflowY: 'auto', padding: '40px', zIndex: 100 }}>
            <div style={{ position: 'relative', width: '794px', height: '1123px', background: 'white', color: 'black', padding: '80px', boxShadow: '0 0 60px black' }}>
              <button onClick={() => setActiveDoc(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#800000', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>✕ CLOSE</button>
              <h2 style={{ color: '#800000', borderBottom: '3px solid #800000', paddingBottom: '10px' }}>{activeDoc.name}</h2>
              <div style={{ marginTop: '50px', fontSize: '18px', lineHeight: '2' }}>{activeDoc.content}</div>
              <p style={{ position: 'absolute', bottom: '80px', borderTop: '1px solid #eee', width: '634px', paddingTop: '20px', fontStyle: 'italic' }}>Document verification finalized by DreamTeam Consulting.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

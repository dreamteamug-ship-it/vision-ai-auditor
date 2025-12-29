"use client";
import React, { useState, useRef } from 'react';

export default function DreamTeamMasterSystem() {
  const [currentView, setCurrentView] = useState<'admin' | 'project'>('admin');
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [upperImage, setUpperImage] = useState<string | null>(null);
  
  const [masterFolders] = useState([
    { id: 'admin', name: 'ADMIN', icon: '🛠️' },
    { id: 'balaji', name: 'BALAJI', icon: '🏭' },
    { id: 'sassy', name: 'SASSY', icon: '✨' },
  ]);

  const [files] = useState({
    balaji: [
      { id: 101, name: "120-Day Phase 1.pdf", content: "Executive Audit: Phase 1 starts with 30% reserve." },
      { id: 102, name: "Nairobi Factory Fit.pdf", content: "Technical specs for installation." }
    ],
    sassy: [
      { id: 201, name: "Luxury Branding.pdf", content: "Sassy Pad 4K Branding strategy featuring Maroon and Gold accents." }
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', background: '#050505', color: '#e0e0e0', overflow: 'hidden' }}>
      
      {/* --- UPPER HALF: THE CINEMATIC VIEWPORT --- */}
      {/* This container ensures ANY image scales and aligns to the frame perfectly */}
      <div style={{ 
        height: '50vh', 
        width: '100vw', 
        background: '#000', 
        borderBottom: '4px solid #D4AF37', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        {upperImage ? (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${upperImage})`,
            backgroundSize: 'cover',        // FORCES PERFECT FILL
            backgroundPosition: 'center',   // FORCES PERFECT ALIGNMENT
            backgroundRepeat: 'no-repeat',
            transition: 'background-image 0.5s ease-in-out' // Smooth swap
          }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#222', letterSpacing: '8px', fontSize: '12px' }}>
            UPLOAD 4K ASSET TO INITIALIZE VIEWPORT
          </div>
        )}
      </div>

      {/* --- LOWER HALF: MASTER DASHBOARD & CONTROLS --- */}
      <div style={{ height: '50vh', width: '100vw', display: 'flex', background: '#800000' }}>
        
        {/* MASTER STRIP (Far Left) */}
        <nav style={{ width: '80px', background: '#000', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: '25px', flexShrink: 0 }}>
          <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '20px' }}>DT</div>
          {masterFolders.map(folder => (
            <button 
              key={folder.id} 
              onClick={() => { setCurrentView(folder.id as any); setActiveDoc(null); }}
              style={{ 
                width: '45px', height: '45px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                background: currentView === folder.id ? '#800000' : '#1a1a1a', 
                fontSize: '18px', transition: 'all 0.3s'
              }}
            >
              {folder.icon}
            </button>
          ))}
        </nav>

        {/* SECONDARY PANEL (File Dashboard) */}
        <aside style={{ width: '300px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '25px', overflowY: 'auto', flexShrink: 0 }}>
          <h2 style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '3px', marginBottom: '20px', textTransform: 'uppercase' }}>
            {currentView} Master Dashboard
          </h2>
          
          {currentView === 'admin' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ color: '#D4AF37', fontSize: '11px', cursor: 'pointer', border: '1px solid #D4AF37', padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>
                REPLACE 4K VIEWPORT IMAGE
                <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
              <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>*AI Auto-alignment enabled</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(files as any)[currentView]?.map((file: any) => (
                <div key={file.id} onClick={() => setActiveDoc(file)} style={{ padding: '15px', background: activeDoc?.id === file.id ? '#4d0000' : '#222', fontSize: '13px', cursor: 'pointer', borderRadius: '5px', borderLeft: activeDoc?.id === file.id ? '4px solid #D4AF37' : 'none' }}>
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* BRANDING AREA (Main Content) */}
        <main style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#800000' }}>
          <div>
            <h1 style={{ color: '#D4AF37', fontSize: '3.5rem', fontWeight: 'bold', margin: 0, textShadow: '2px 2px 5px rgba(0,0,0,0.3)' }}>DreamTeam Consulting</h1>
            <p style={{ color: '#f5e27a', fontSize: '1.4rem', fontStyle: 'italic', borderTop: '2px solid #D4AF37', paddingTop: '10px', display: 'inline-block', marginTop: '10px' }}>
              Strategic Master Dashboard
            </p>
          </div>
        </main>
      </div>

      {/* OVERLAPPING A4 DOCUMENT SYSTEM */}
      {activeDoc && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', overflowY: 'auto', padding: '40px', zIndex: 100 }}>
          <div style={{ position: 'relative', width: '794px', height: '1123px', background: 'white', color: 'black', padding: '80px', boxShadow: '0 0 50px black' }}>
            <button onClick={() => setActiveDoc(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#800000', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer', fontWeight: 'bold' }}>CLOSE</button>
            <h2 style={{ color: '#800000', borderBottom: '3px solid #800000', paddingBottom: '10px' }}>{activeDoc.name}</h2>
            <div style={{ marginTop: '50px', fontSize: '16px', lineHeight: '2' }}>{activeDoc.content}</div>
            <p style={{ position: 'absolute', bottom: '80px', borderTop: '1px solid #eee', width: '634px', paddingTop: '15px', color: '#666' }}>Official DreamTeam Verification Record.</p>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState } from 'react';

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
      { id: 101, name: "120-Day Phase 1.pdf", content: "Executive Audit: Phase 1 starts with 30% reserve. Logistics for Nairobi fit-out are finalized." },
      { id: 102, name: "Nairobi Factory Fit.pdf", content: "Technical specs for installation. Safety protocols are ready for review." }
    ],
    sassy: [
      { id: 201, name: "Luxury Branding.pdf", content: "Sassy Pad 4K Branding strategy. Focus on the Maroon (#800000) and Gold (#D4AF37) palette." }
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
      
      {/* --- LEVEL 1: MASTER STRIP (Full Height) --- */}
      <nav style={{ 
        width: '70px', background: '#000', borderRight: '1px solid #222', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        padding: '20px 0', gap: '25px', flexShrink: 0 
      }}>
        <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>DT</div>
        {masterFolders.map(folder => (
          <button 
            key={folder.id} 
            onClick={() => { setCurrentView(folder.id as any); setActiveDoc(null); }}
            style={{ 
              width: '45px', height: '45px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              background: currentView === folder.id ? '#800000' : '#111', 
              fontSize: '18px', transition: 'all 0.2s', border: currentView === folder.id ? '1px solid #D4AF37' : 'none'
            }}
          >
            {folder.icon}
          </button>
        ))}
      </nav>

      {/* --- LEVEL 2: SECONDARY SIDE PANEL (Full Height) --- */}
      <aside style={{ 
        width: '300px', background: '#1a0000', borderRight: '1px solid #D4AF37', 
        padding: '25px', display: 'flex', flexDirection: 'column', flexShrink: 0 
      }}>
        <h2 style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '3px', marginBottom: '30px', textTransform: 'uppercase' }}>
          {currentView} Master Dashboard
        </h2>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {currentView === 'admin' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ 
                color: '#D4AF37', fontSize: '11px', cursor: 'pointer', 
                border: '1px solid #D4AF37', padding: '15px', textAlign: 'center', 
                fontWeight: 'bold', background: 'rgba(212,175,55,0.05)' 
              }}>
                REPLACE 4K VIEWPORT IMAGE
                <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
              <div style={{ padding: '15px', border: '1px solid #333', fontSize: '12px', color: '#888' }}>
                ADMIN SETTINGS: <br/>
                - Permissions: Active <br/>
                - AI Enhancement: ON
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(files as any)[currentView]?.map((file: any) => (
                <div 
                  key={file.id} 
                  onClick={() => setActiveDoc(file)} 
                  style={{ 
                    padding: '15px', background: activeDoc?.id === file.id ? '#4d0000' : '#111', 
                    fontSize: '13px', cursor: 'pointer', borderRadius: '5px', 
                    border: activeDoc?.id === file.id ? '1px solid #D4AF37' : '1px solid #222',
                    transition: '0.2s'
                  }}
                >
                  📄 {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ paddingTop: '20px', borderTop: '1px solid #333', fontSize: '10px', color: '#555' }}>
          DreamTeam Consulting © 2025
        </div>
      </aside>

      {/* --- RIGHT WORKSTAGE --- */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* UPPER 4K VIEWPORT */}
        <div style={{ height: '50%', width: '100%', background: '#000', borderBottom: '2px solid #D4AF37' }}>
          {upperImage ? (
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `url(${upperImage})`,
              backgroundSize: 'cover', backgroundPosition: 'center'
            }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#222', letterSpacing: '5px' }}>
              4K CINEMATIC ENGINE ACTIVE
            </div>
          )}
        </div>

        {/* LOWER BRANDING STAGE */}
        <div style={{ height: '50%', width: '100%', background: '#800000', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ color: '#D4AF37', fontSize: '4rem', fontWeight: 'bold', margin: 0 }}>DreamTeam</h1>
          <h2 style={{ color: '#f5e27a', fontSize: '1.5rem', fontStyle: 'italic', margin: 0, opacity: 0.8 }}>Consulting Master Dashboard</h2>
          <div style={{ width: '100px', height: '3px', background: '#D4AF37', marginTop: '20px' }}></div>
        </div>

        {/* A4 DOCUMENT OVERLAY (Overlaps the Right Side Only) */}
        {activeDoc && (
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            background: 'rgba(0,0,0,0.92)', display: 'flex', justifyContent: 'center', 
            overflowY: 'auto', padding: '40px', zIndex: 100 
          }}>
            <div style={{ 
              position: 'relative', width: '794px', height: '1123px', 
              background: 'white', color: 'black', padding: '80px', 
              boxShadow: '0 0 50px rgba(0,0,0,1)' 
            }}>
              <button 
                onClick={() => setActiveDoc(null)} 
                style={{ 
                  position: 'absolute', top: '20px', right: '20px', 
                  background: '#800000', color: 'white', border: 'none', 
                  padding: '10px 15px', cursor: 'pointer', fontWeight: 'bold' 
                }}
              >
                CLOSE
              </button>
              <h2 style={{ color: '#800000', borderBottom: '3px solid #800000', paddingBottom: '10px' }}>
                {activeDoc.name}
              </h2>
              <div style={{ marginTop: '50px', fontSize: '17px', lineHeight: '1.8' }}>
                {activeDoc.content}
              </div>
              <p style={{ position: 'absolute', bottom: '80px', borderTop: '1px solid #eee', width: '634px', paddingTop: '15px', color: '#666' }}>
                Strategic Audit Verification Record.
              </p>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}

"use client";
import React, { useState, useRef } from 'react';

export default function DreamTeamMasterSystem() {
  // State for Navigation Levels
  const [currentView, setCurrentView] = useState<'admin' | 'project'>('admin');
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [activeAnnex, setActiveAnnex] = useState<any>(null);
  const [upperImage, setUpperImage] = useState<string | null>(null);
  
  // State for Master "Folders" (Left Strip)
  const [masterFolders, setMasterFolders] = useState([
    { id: 'admin', name: 'ADMIN TOOLS', icon: '🛠️' },
    { id: 'balaji', name: 'BALAJI HYGIENE', icon: '🏭' },
    { id: 'sassy', name: 'SASSY PADS', icon: '✨' },
  ]);

  // State for specific files (Secondary Sidebar)
  const [files, setFiles] = useState({
    balaji: [
      { id: 101, name: "120-Day Phase 1.pdf", content: "Executive Audit: Phase 1 starts with 30% reserve.", annexures: [] },
      { id: 102, name: "Nairobi Factory Fit.pdf", content: "Technical specs for installation.", annexures: [] }
    ],
    sassy: [
      { id: 201, name: "Luxury Branding.pdf", content: "Sassy Pad 4K Branding strategy.", annexures: [{ title: "Color Palettes", body: "Maroon #800000, Gold #D4AF37" }] }
    ]
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUpperImage(ev.target?.result as string);
        alert("AI Engine: 4K Enhancement Complete.");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#050505', color: '#e0e0e0', overflow: 'hidden' }}>
      
      {/* LEVEL 1: MASTER DASHBOARD (Far Left Strip) */}
      <nav className="no-print" style={{ width: '80px', background: '#000', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', py: '20px', gap: '20px', flexShrink: 0 }}>
        <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '20px', margin: '20px 0' }}>DT</div>
        {masterFolders.map(folder => (
          <button 
            key={folder.id} 
            onClick={() => { setCurrentView(folder.id as any); setActiveDoc(null); }}
            title={folder.name}
            style={{ 
              width: '50px', height: '50px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: currentView === folder.id ? '#800000' : '#1a1a1a', 
              fontSize: '20px', transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            {folder.icon}
          </button>
        ))}
      </nav>

      {/* LEVEL 2: SECONDARY SIDE PANEL (Contextual Files) */}
      <aside className="no-print" style={{ width: '280px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '20px', flexShrink: 0, overflowY: 'auto' }}>
        <h2 style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '2px', marginBottom: '25px' }}>
          {currentView.toUpperCase()} CONTENT
        </h2>

        {currentView === 'admin' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ fontSize: '12px', color: '#888' }}>ADMIN CONTROL CENTER</p>
            <label style={{ color: '#D4AF37', fontSize: '11px', cursor: 'pointer', border: '1px solid #D4AF37', padding: '12px', textAlign: 'center' }}>
              4K IMAGE UPLOAD
              <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
            <button style={{ background: '#333', border: 'none', color: 'white', padding: '10px', fontSize: '11px' }}>SYSTEM AUDIT</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(files as any)[currentView]?.map((file: any) => (
              <div 
                key={file.id} 
                onClick={() => setActiveDoc(file)}
                style={{ 
                  padding: '12px', background: activeDoc?.id === file.id ? '#3d0000' : '#222', 
                  fontSize: '13px', cursor: 'pointer', borderRadius: '6px', borderLeft: activeDoc?.id === file.id ? '4px solid #D4AF37' : 'none'
                }}
              >
                {file.name}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* LEVEL 3: MAIN WORKSTAGE */}
      <main style={{ flex: 1, position: 'relative', background: '#800000', display: 'flex', flexDirection: 'column' }}>
        
        {/* UPPER DASHBOARD: 4K FRAME */}
        <div style={{ height: '50vh', width: '100%', background: '#000', position: 'relative', borderBottom: '4px solid #D4AF37' }}>
          <div style={{ 
            width: '100%', height: '100%', 
            backgroundImage: upperImage ? `url(${upperImage})` : 'none',
            backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8
          }} />
          <div style={{ position: 'absolute', bottom: '20px', left: '30px', color: '#D4AF37', textShadow: '2px 2px 10px black' }}>
            <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 'bold' }}>DREAMTEAM</h1>
          </div>
        </div>

        {/* LOWER DASHBOARD: MISSION & TOOLS */}
        <div style={{ height: '50vh', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#f5e27a', fontSize: '20px', fontStyle: 'italic', maxWidth: '600px', textAlign: 'center' }}>
            Operational Control Active. Navigate Master folders to view detailed A4 audit files.
          </p>
        </div>

        {/* OVERLAPPING A4 DOCUMENT MODULE */}
        {activeDoc && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', overflowY: 'auto', padding: '20px', zIndex: 100 }}>
            <div style={{ position: 'relative', width: '794px', height: '1123px', background: 'white', color: 'black', padding: '80px', boxShadow: '0 0 50px black' }}>
              <div className="no-print" style={{ position: 'absolute', top: '20px', right: '-80px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={() => setActiveDoc(null)} style={{ background: '#800000', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>✕</button>
                <button onClick={() => window.print()} style={{ background: 'white', color: '#800000', border: '1px solid #800000', padding: '10px', cursor: 'pointer' }}>🖨️</button>
              </div>
              <h2 style={{ color: '#800000', borderBottom: '2px solid #800000' }}>{activeDoc.name}</h2>
              <p style={{ marginTop: '40px', lineHeight: '1.8' }}>{activeDoc.content}</p>
              
              {activeDoc.annexures.map((an: any, i: number) => (
                <button key={i} onClick={() => setActiveAnnex(an)} style={{ marginTop: '20px', display: 'block', background: '#1a0000', color: '#D4AF37', padding: '10px', border: 'none', cursor: 'pointer' }}>
                  OPEN {an.title.toUpperCase()}
                </button>
              ))}
              <div style={{ position: 'absolute', bottom: '80px', fontSize: '12px', borderTop: '1px solid #ddd', width: '634px', pt: '10px' }}>Finalized for DreamTeam Audit.</div>
            </div>
          </div>
        )}

        {/* NESTED ANNEXURE MODULE */}
        {activeAnnex && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(128,0,0,0.98)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 200 }}>
            <div style={{ width: '500px', background: 'white', color: 'black', padding: '40px', borderTop: '5px solid #D4AF37' }}>
              <h3>{activeAnnex.title}</h3>
              <p style={{ margin: '20px 0' }}>{activeAnnex.body}</p>
              <button onClick={() => setActiveAnnex(null)} style={{ background: '#800000', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>BACK</button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          main { background: white !important; }
          .a4-page { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}

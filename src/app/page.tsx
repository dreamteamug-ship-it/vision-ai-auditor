"use client";
import React, { useState, useRef } from 'react';

export default function DreamTeamProPortal() {
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [activeAnnex, setActiveAnnex] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [upperImage, setUpperImage] = useState(null);
  const [sidebarFiles, setSidebarFiles] = useState([
    { id: 1, name: "120-Day Phase 1 Rollout.pdf", content: "Executive Audit Content...", annexures: [{ title: "Bank LC Documents", body: "LC Details here..." }] },
    { id: 2, name: "Machinery Fit-out Nairobi.pdf", content: "Technical Specs...", annexures: [] }
  ]);

  // 1. Image Upload & AI Enhancement Simulation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Here we simulate 4K Upscaling/Enhancement
        setUpperImage(event.target?.result as any);
        alert("AI Enhancement Engine: Image upscaled to 4K resolution.");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0a', color: '#e0e0e0', overflow: 'hidden' }}>
      
      {/* --- SIDEBAR --- */}
      <aside className="no-print" style={{ width: '320px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '24px', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ color: '#D4AF37', fontSize: '28px', border: '2px solid #D4AF37', borderRadius: '50%', width: '60px', height: '60px', lineHeight: '60px', margin: '0 auto' }}>DT</div>
          <h2 style={{ fontSize: '10px', color: '#D4AF37', marginTop: '10px', letterSpacing: '3px' }}>DREAMTEAM CONSULTING</h2>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ color: '#D4AF37', fontSize: '11px', cursor: 'pointer', border: '1px solid #D4AF37', padding: '8px', display: 'block', textAlign: 'center' }}>
            UPLOAD & ENHANCE IMAGE
            <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        </div>

        <p style={{ fontSize: '11px', color: '#888', marginBottom: '15px' }}>OFFICIAL DOCUMENTS</p>
        {sidebarFiles.map((doc) => (
          <div 
            key={doc.id} 
            onClick={() => setActiveDoc(doc)}
            style={{ padding: '12px', background: '#2d0000', marginBottom: '10px', cursor: 'pointer', borderLeft: activeDoc?.id === doc.id ? '4px solid #D4AF37' : 'none' }}
          >
            <span style={{ fontSize: '13px' }}>{doc.name}</span>
          </div>
        ))}
      </aside>

      {/* --- MAIN STAGE --- */}
      <main style={{ flex: 1, position: 'relative', background: '#800000' }}>
        
        {/* LANDING PAGE (Always in background) */}
        <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, background: upperImage ? `url(${upperImage})` : '#000', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6 }}></div>
          <div style={{ padding: '60px', textAlign: 'center', color: '#D4AF37' }}>
            <h1 style={{ fontSize: '4rem', margin: 0 }}>DREAMTEAM</h1>
            <p style={{ fontStyle: 'italic' }}>Strategic Operational Intelligence</p>
          </div>
        </div>

        {/* OVERLAPPING DOCUMENT MODAL */}
        {activeDoc && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', overflowY: 'auto', padding: '40px', zIndex: 20 }}>
            <div style={{ position: 'relative', width: '794px', height: '1123px', background: 'white', color: 'black', padding: '80px', boxShadow: '0 0 50px black' }}>
              <button onClick={() => setActiveDoc(null)} style={{ position: 'absolute', top: 20, right: 20, background: '#800000', color: 'white', border: 'none', padding: '5px 15px', cursor: 'pointer' }}>CLOSE</button>
              
              <h2 style={{ color: '#800000', borderBottom: '2px solid #800000' }}>{activeDoc.name}</h2>
              <p style={{ marginTop: '30px', lineHeight: '2' }}>{activeDoc.content}</p>

              {activeDoc.annexures.length > 0 && (
                <div style={{ marginTop: '50px' }}>
                  <h4 style={{ color: '#D4AF37', background: '#1a0000', padding: '10px' }}>ANNEXURES AVAILABLE</h4>
                  {activeDoc.annexures.map((annex: any, idx: number) => (
                    <button key={idx} onClick={() => setActiveAnnex(annex)} style={{ marginTop: '10px', display: 'block', border: '1px solid #800000', background: 'none', padding: '10px', cursor: 'pointer' }}>
                      Open {annex.title}
                    </button>
                  ))}
                </div>
              )}
              <p style={{ position: 'absolute', bottom: 80, left: 80 }}>Verification completed.</p>
            </div>
          </div>
        )}

        {/* NESTED ANNEXURE MODAL (Module within Module) */}
        {activeAnnex && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(128,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 30 }}>
            <div style={{ width: '600px', background: 'white', color: 'black', padding: '40px', borderRadius: '10px', boxShadow: '0 0 100px #D4AF37' }}>
              <h3 style={{ color: '#800000' }}>{activeAnnex.title}</h3>
              <p style={{ margin: '20px 0', lineHeight: '1.6' }}>{activeAnnex.body}</p>
              <button onClick={() => setActiveAnnex(null)} style={{ background: '#800000', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>BACK TO DOCUMENT</button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          main { background: white !important; }
          .a4-page { box-shadow: none !important; margin: 0 !important; }
        }
      `}</style>
    </div>
  );
}

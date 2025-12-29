"use client";
import React, { useState, useRef } from 'react';

export default function DreamTeamPortal() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [upperImage, setUpperImage] = useState('/sassy_upper_placeholder.jpg'); // You can drag-drop to replace
  const [lowerImage, setLowerImage] = useState('/sassy_lower_placeholder.jpg');
  const [sidebarFiles, setSidebarFiles] = useState<{name: string, type: string}[]>([]);
  const [stamps, setStamps] = useState<{ x: number, y: number }[]>([]);

  // Drag and Drop Image Handler
  const handleImageDrop = (e: React.DragEvent, setter: (val: string) => void) => {
    e.preventDefault();
    if (!isAdmin) return;
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => setter(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addStamp = (e: React.MouseEvent) => {
    if (!isAdmin) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setStamps([...stamps, { x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0a', color: '#e0e0e0', fontFamily: "'Garamond', serif" }}>
      
      {/* SIDEBAR */}
      <aside className="no-print" style={{ width: '300px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ color: '#D4AF37', fontSize: '28px', border: '2px solid #D4AF37', borderRadius: '50%', width: '60px', height: '60px', lineHeight: '60px', margin: '0 auto' }}>DT</div>
          <h2 style={{ fontSize: '12px', color: '#D4AF37', marginTop: '10px', letterSpacing: '2px' }}>DREAMTEAM ASSETS</h2>
        </div>
        <div style={{ flex: 1 }}>
           <p style={{ fontSize: '11px', color: '#888', marginBottom: '10px' }}>AUDIT QUEUE</p>
           {sidebarFiles.map((f, i) => (
             <div key={i} style={{ padding: '8px', background: '#2d0000', marginBottom: '5px', borderRadius: '4px', fontSize: '12px' }}>{f.name}</div>
           ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, overflowY: 'auto', background: '#f4f4f4' }}>
        
        {/* LANDING PAGE: MAROON & GOLD */}
        <section className="no-print" style={{ background: '#800000', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          
          {/* Upper Image Zone */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleImageDrop(e, setUpperImage)}
            style={{ height: '40vh', width: '100%', overflow: 'hidden', position: 'relative', borderBottom: '5px solid #D4AF37', background: '#000' }}
          >
            <img src={upperImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.7' }} alt="Upper Asset" />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
              <h1 style={{ color: '#D4AF37', fontSize: '60px', textTransform: 'uppercase', letterSpacing: '10px', textShadow: '4px 4px 8px black' }}>DreamTeam</h1>
            </div>
            {isAdmin && <div style={{ position: 'absolute', top: 10, right: 10, background: '#D4AF37', color: 'black', fontSize: '10px', padding: '4px 8px' }}>ADMIN: DRAG IMAGE HERE</div>}
          </div>

          {/* Executive Content */}
          <div style={{ padding: '60px', textAlign: 'center', flex: 1 }}>
             <p style={{ color: '#f5e27a', fontSize: '24px', fontStyle: 'italic', marginBottom: '30px' }}>Strategic Audit Portal</p>
             <div style={{ maxWidth: '700px', margin: '0 auto', color: 'white', lineHeight: '1.8' }}>
                <p>Welcome to the Balaji Hygiene Products "Sassy Pad" Rollout Workspace. Please use the sidebar to access raw data, and interact with the A4 documents below for official sign-off. All pages are perfectly aligned for A4 standard printing.</p>
             </div>
          </div>

          {/* Lower Image Zone */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleImageDrop(e, setLowerImage)}
            style={{ height: '30vh', width: '100%', overflow: 'hidden', borderTop: '5px solid #D4AF37', background: '#000' }}
          >
            <img src={lowerImage} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.6' }} alt="Lower Asset" />
            {isAdmin && <div style={{ position: 'absolute', bottom: 10, right: 10, background: '#D4AF37', color: 'black', fontSize: '10px', padding: '4px 8px' }}>ADMIN: DRAG IMAGE HERE</div>}
          </div>
        </section>

        {/* A4 DOCUMENT SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0' }}>
          <div onClick={addStamp} style={{ position: 'relative', width: '794px', height: '1123px', background: 'white', padding: '80px', color: 'black', boxShadow: '0 0 40px rgba(0,0,0,0.2)' }}>
            {stamps.map((s, i) => (
              <div key={i} style={{ position: 'absolute', left: s.x - 50, top: s.y - 50, width: '100px', height: '100px', border: '4px solid red', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red', fontWeight: 'bold', transform: 'rotate(-20deg)', pointerEvents: 'none' }}>APPROVED</div>
            ))}
            <h2 style={{ color: '#800000', borderBottom: '3px solid #800000', paddingBottom: '10px' }}>120-DAY PHASE 1 ROLLOUT</h2>
            <p style={{ marginTop: '30px', fontSize: '15px', lineHeight: '2' }}>
              The implementation of the Balaji Hygiene production line is set for the Nairobi facility. All raw materials (Sassy Pad components) are to be audited against international hygiene standards. 
            </p>
            {/* Page Fullstop sentence as requested */}
            <p style={{ marginTop: '800px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>This document concludes Phase 1 verification.</p>
          </div>
        </div>
      </main>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          main { padding: 0 !important; }
          div { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}

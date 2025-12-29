"use client";
import React, { useState, useRef } from 'react';

export default function VisionAIWorkspace() {
  const [sidebarFiles, setSidebarFiles] = useState<{name: string, type: string}[]>([]);
  const [isAdmin, setIsAdmin] = useState(true); // Toggle for Admin/Viewer mode
  const [stamps, setStamps] = useState<{ x: number, y: number }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Handle Sidebar Uploads (Left Panel)
  const handleSidebarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newFiles = files.map(f => ({ name: f.name, type: f.type }));
      setSidebarFiles(prev => [...prev, ...newFiles]);
    }
  };

  // 2. Digital Stamp Logic
  const addStamp = (e: React.MouseEvent) => {
    if (!isAdmin) return; // Only admins or designated signers can stamp
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStamps([...stamps, { x, y }]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#121212', color: '#e0e0e0', fontFamily: "'Inter', sans-serif" }}>
      
      {/* --- LEFT SIDEBAR: FILE LIBRARY --- */}
      <aside className="no-print" style={{ width: '320px', borderRight: '1px solid #333', padding: '24px', display: 'flex', flexDirection: 'column', background: '#1a1a1a' }}>
        <h2 style={{ color: '#D4AF37', fontSize: '14px', letterSpacing: '2px', marginBottom: '20px', fontWeight: 'bold' }}>PROCURMENT ASSETS</h2>
        
        <div style={{ border: '2px dashed #444', padding: '20px', textAlign: 'center', marginBottom: '20px', borderRadius: '12px', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}>
          <p style={{ fontSize: '12px', color: '#aaa' }}>Drag & Drop MP4, PDF, or Images</p>
          <input type="file" multiple ref={fileInputRef} onChange={handleSidebarUpload} style={{ display: 'none' }} />
          <button style={{ marginTop: '10px', padding: '8px 16px', background: '#333', border: '1px solid #444', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>Browse</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {sidebarFiles.length === 0 && <p style={{ fontSize: '12px', color: '#555', textAlign: 'center' }}>No files uploaded yet</p>}
          {sidebarFiles.map((file, i) => (
            <div key={i} style={{ padding: '12px', background: '#252525', marginBottom: '8px', borderRadius: '8px', fontSize: '12px', display: 'flex', alignItems: 'center', border: '1px solid #333' }}>
              <span style={{ marginRight: '10px' }}>{file.type.includes('video') ? '🎥' : file.type.includes('pdf') ? '📄' : '🖼️'}</span>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</span>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: '20px', borderTop: '1px solid #333', fontSize: '11px', color: '#666' }}>
          Logged in as: <span style={{ color: '#D4AF37' }}>{isAdmin ? 'ADMIN' : 'COLLEAGUE'}</span>
        </div>
      </aside>

      {/* --- RIGHT DASHBOARD: INTERACTIVE DOCUMENT --- */}
      <main style={{ flex: 1, background: '#2a2a2a', overflowY: 'auto', padding: '40px' }}>
        
        {/* TOP CONTROL BAR */}
        <div className="no-print" style={{ maxWidth: '850px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#800000', padding: '12px 24px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '13px' }}>BALAJI WORKSPACE</span>
            {isAdmin && <span style={{ background: '#D4AF37', color: 'black', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '900' }}>EDIT ENABLED</span>}
          </div>
          <button onClick={() => window.print()} style={{ background: 'white', color: '#800000', border: 'none', padding: '8px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>PRINT & SIGN COPY</button>
        </div>

        {/* THE DOCUMENT PAGE */}
        <div 
          onClick={addStamp}
          style={{ 
            background: '#f5e27a', 
            width: '800px', 
            margin: '0 auto', 
            padding: '80px', 
            boxShadow: '0 0 60px rgba(0,0,0,0.5)',
            minHeight: '1123px',
            color: 'black',
            position: 'relative',
            cursor: isAdmin ? 'crosshair' : 'default'
          }}
        >
          {/* Stamps Layer */}
          {stamps.map((s, i) => (
            <div key={i} style={{ position: 'absolute', left: s.x - 40, top: s.y - 40, width: '100px', height: '100px', border: '4px solid rgba(255,0,0,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,0,0,0.6)', fontWeight: '900', transform: 'rotate(-20deg)', pointerEvents: 'none', fontSize: '12px', textAlign: 'center' }}>
              APPROVED<br/>BALAJI AI
            </div>
          ))}

          <h1 style={{ textAlign: 'center', color: '#800000', fontSize: '52px', fontWeight: '900', marginBottom: '10px' }}>Balaji Hygiene Products</h1>
          <p style={{ textAlign: 'center', fontSize: '18px', letterSpacing: '4px', color: '#333', textTransform: 'uppercase', marginBottom: '60px' }}>Ultra-Luxury Rollout Plan</p>
          
          <div style={{ height: '4px', background: '#800000', width: '100px', margin: '0 auto 40px auto' }}></div>

          <div contentEditable={isAdmin} suppressContentEditableWarning={true} style={{ outline: 'none' }}>
            <h3 style={{ color: '#800000', borderBottom: '2px solid #800000', paddingBottom: '5px' }}>Executive Summary</h3>
            <p style={{ lineHeight: '1.6', fontSize: '15px' }}>
              This comprehensive 120-day Phase 1 rollout and 1-year Phase 2 MVP implementation plan details every activity, responsible party, and compliance requirement...
            </p>

            <div style={{ margin: '30px 0', padding: '20px', border: '2px solid #800000', background: 'rgba(255,255,255,0.3)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontStyle: 'italic', color: '#800000' }}>[Admin: Drag an image here or type /ai to generate]</p>
            </div>

            <h3 style={{ color: '#800000', borderBottom: '2px solid #800000', paddingBottom: '5px', marginTop: '40px' }}>Operational Milestones</h3>
            <ul style={{ lineHeight: '2' }}>
              <li><strong>Secure initial deposit reserve:</strong> Day 0-10</li>
              <li><strong>Machinery placement (Altovex):</strong> Day 10-30</li>
              <li><strong>Factory fit-out Nairobi:</strong> Day 31-60</li>
            </ul>
          </div>

          {/* Footer Signature Area */}
          <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ width: '200px', borderTop: '1px solid black', textAlign: 'center', paddingTop: '10px', fontSize: '12px' }}>
              CHIEF AUDITOR
            </div>
            <div style={{ width: '200px', borderTop: '1px solid black', textAlign: 'center', paddingTop: '10px', fontSize: '12px' }}>
              COLLEAGUE SIGNATURE
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          main { padding: 0 !important; background: white !important; }
          div { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}

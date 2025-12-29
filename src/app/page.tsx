"use client";
import React, { useState, useRef } from 'react';

export default function DreamTeamConsultingPortal() {
  const [sidebarFiles, setSidebarFiles] = useState<{name: string, type: string}[]>([]);
  const [isAdmin, setIsAdmin] = useState(true); 
  const [stamps, setStamps] = useState<{ x: number, y: number }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSidebarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newFiles = files.map(f => ({ name: f.name, type: f.type }));
      setSidebarFiles(prev => [...prev, ...newFiles]);
    }
  };

  const addStamp = (e: React.MouseEvent) => {
    if (!isAdmin) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStamps([...stamps, { x, y }]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0a0a0a', color: '#e0e0e0', fontFamily: "'Garamond', serif" }}>
      
      {/* --- SIDEBAR: ASSET LIBRARY --- */}
      <aside className="no-print" style={{ width: '300px', borderRight: '1px solid #2d0000', padding: '24px', display: 'flex', flexDirection: 'column', background: '#1a0000' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ color: '#D4AF37', fontSize: '24px', fontWeight: 'bold', border: '2px solid #D4AF37', padding: '10px', display: 'inline-block', borderRadius: '50%' }}>DT</div>
          <h3 style={{ color: '#D4AF37', fontSize: '12px', marginTop: '10px', letterSpacing: '2px' }}>DREAMTEAM ASSETS</h3>
        </div>
        
        <div style={{ border: '1px dashed #D4AF37', padding: '15px', textAlign: 'center', marginBottom: '20px', borderRadius: '8px', cursor: 'pointer', background: 'rgba(212, 175, 55, 0.05)' }} onClick={() => fileInputRef.current?.click()}>
          <p style={{ fontSize: '11px', color: '#D4AF37' }}>DRAG & DROP AUDIT FILES</p>
          <input type="file" multiple ref={fileInputRef} onChange={handleSidebarUpload} style={{ display: 'none' }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {sidebarFiles.map((file, i) => (
            <div key={i} style={{ padding: '10px', background: '#2d0000', marginBottom: '8px', borderRadius: '4px', fontSize: '12px', borderLeft: '3px solid #D4AF37' }}>
              {file.name}
            </div>
          ))}
        </div>
      </aside>

      {/* --- MAIN STAGE --- */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '0', background: '#f4f4f4' }}>
        
        {/* LANDING / COVER PAGE */}
        <section style={{ height: '100vh', background: '#800000', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#D4AF37', textAlign: 'center', borderBottom: '10px solid #D4AF37' }} className="no-print">
          <div style={{ fontSize: '100px', fontWeight: 'bold', marginBottom: '10px', textShadow: '3px 3px 0px #4b0000' }}>DT</div>
          <h1 style={{ fontSize: '48px', letterSpacing: '8px', textTransform: 'uppercase' }}>DreamTeam Consulting</h1>
          <div style={{ width: '200px', height: '2px', background: '#D4AF37', margin: '20px auto' }}></div>
          <p style={{ maxWidth: '600px', fontSize: '18px', color: '#f5e27a', lineHeight: '1.6', fontStyle: 'italic' }}>
            "Excellence in Strategic Auditing & Operational Precision"
          </p>
          
          <div style={{ marginTop: '50px', background: 'rgba(0,0,0,0.2)', padding: '30px', borderRadius: '15px', border: '1px solid #D4AF37' }}>
            <h4 style={{ marginBottom: '15px' }}>TEAM INSTRUCTIONS</h4>
            <ul style={{ textAlign: 'left', fontSize: '14px', color: 'white', listStyle: 'square' }}>
              <li>Interact with documents in the sidebar.</li>
              <li>Click to apply "APPROVED" stamp (Admin Only).</li>
              <li>Save to PDF or Print for physical records.</li>
              <li>Request Admin for any data modifications.</li>
            </ul>
          </div>
        </section>

        {/* STANDALONE A4 PAGES */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 0' }}>
          
          {/* PAGE 1 */}
          <div className="a4-page" onClick={addStamp} style={{ position: 'relative', width: '794px', height: '1123px', background: 'white', padding: '80px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', marginBottom: '40px', color: 'black' }}>
             {/* Stamps Layer */}
             {stamps.map((s, i) => (
                <div key={i} style={{ position: 'absolute', left: s.x - 50, top: s.y - 50, width: '100px', height: '100px', border: '3px solid red', borderRadius: '50%', color: 'red', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-15deg)', pointerEvents: 'none' }}>APPROVED</div>
             ))}

             <h2 style={{ borderBottom: '2px solid #800000', color: '#800000', paddingBottom: '10px' }}>EXECUTIVE SUMMARY</h2>
             <p style={{ fontSize: '16px', lineHeight: '1.8', marginTop: '30px' }}>
                DreamTeam Consulting is committed to delivering ultra-high precision operational roadmaps. This document serves as the primary gateway for all project milestones and compliance checks. We invite all team members to review the attached assets in the sidebar and verify the alignment of each phase against our core strategic objectives.
             </p>
             <p style={{ marginTop: '20px' }}>Every page in this audit is formatted for A4 standard to ensure zero bleeding and perfect alignment.</p>
             <div style={{ position: 'absolute', bottom: '40px', width: '100%', left: '0', textAlign: 'center', fontSize: '10px', color: '#aaa' }}>Page 1 / 2 - DT Confidential</div>
          </div>

          {/* PAGE 2 */}
          <div className="a4-page" style={{ position: 'relative', width: '794px', height: '1123px', background: 'white', padding: '80px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', color: 'black' }}>
             <h2 style={{ borderBottom: '2px solid #800000', color: '#800000', paddingBottom: '10px' }}>ADMINISTRATION RIGHTS</h2>
             <p style={{ fontSize: '16px', lineHeight: '1.8', marginTop: '30px' }}>
                Modification of this document is strictly reserved for the Chief Auditor. Team members may request changes via the sidebar portal. Once a page is stamped, it is considered a locked record in our Supabase architecture.
             </p>
             <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '200px', borderTop: '1px solid black', paddingTop: '10px', textAlign: 'center' }}>CHIEF AUDITOR</div>
                <div style={{ width: '200px', borderTop: '1px solid black', paddingTop: '10px', textAlign: 'center' }}>DATE</div>
             </div>
             <div style={{ position: 'absolute', bottom: '40px', width: '100%', left: '0', textAlign: 'center', fontSize: '10px', color: '#aaa' }}>Page 2 / 2 - DT Confidential</div>
          </div>

        </div>
      </main>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          main { padding: 0 !important; background: white !important; }
          .a4-page { 
            margin: 0 !important; 
            box-shadow: none !important; 
            page-break-after: always;
            break-after: page;
          }
        }
      `}</style>
    </div>
  );
}

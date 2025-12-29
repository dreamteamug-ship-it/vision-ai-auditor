"use client";
import React, { useState, useRef } from 'react';

export default function DreamTeamFinalPortal() {
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [activeAnnex, setActiveAnnex] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [upperImage, setUpperImage] = useState<string | null>(null);
  const [sidebarFiles, setSidebarFiles] = useState([
    { 
        id: 1, 
        name: "120-Day Phase 1 Rollout.pdf", 
        content: "This document serves as the primary strategic roadmap for the Balaji Hygiene Products Nairobi facility. All procurement and machinery installations are verified against the 120-day timeline. Compliance is mandatory for all regional stakeholders.", 
        annexures: [{ title: "Bank LC Documents", body: "Standard Chartered LC Approval #9982-A. Funds secured at 30% reserve." }] 
    },
    { 
        id: 2, 
        name: "Machinery Fit-out Nairobi.pdf", 
        content: "Technical specifications for the Sassy Pad production line have been audited. Installation scheduled for Day 90. Electrical and safety standards are fully met.", 
        annexures: [] 
    }
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUpperImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#0a0a0a', color: '#e0e0e0', overflow: 'hidden' }}>
      
      {/* --- SIDEBAR (Fixed Width) --- */}
      <aside className="no-print" style={{ width: '320px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '24px', z_index: 10, flexShrink: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ color: '#D4AF37', fontSize: '28px', border: '2px solid #D4AF37', borderRadius: '50%', width: '60px', height: '60px', lineHeight: '60px', margin: '0 auto', fontWeight: 'bold' }}>DT</div>
          <h2 style={{ fontSize: '10px', color: '#D4AF37', marginTop: '15px', letterSpacing: '3px' }}>DREAMTEAM CONSULTING</h2>
        </div>

        <label style={{ color: '#D4AF37', fontSize: '11px', cursor: 'pointer', border: '1px solid #D4AF37', padding: '12px', display: 'block', textAlign: 'center', marginBottom: '30px', transition: '0.3s' }}>
          UPLOAD & 4K ENHANCE
          <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
        </label>

        <p style={{ fontSize: '11px', color: '#888', marginBottom: '15px', letterSpacing: '1px' }}>ACTIVE AUDITS</p>
        {sidebarFiles.map((doc) => (
          <div 
            key={doc.id} 
            onClick={() => setActiveDoc(doc)}
            style={{ padding: '15px', background: activeDoc?.id === doc.id ? '#3d0000' : '#2d0000', marginBottom: '10px', cursor: 'pointer', borderLeft: activeDoc?.id === doc.id ? '4px solid #D4AF37' : '4px solid transparent', transition: '0.2s' }}
          >
            <span style={{ fontSize: '13px', fontWeight: activeDoc?.id === doc.id ? 'bold' : 'normal' }}>{doc.name}</span>
          </div>
        ))}
      </aside>

      {/* --- MAIN DASHBOARD AREA --- */}
      <main style={{ flex: 1, position: 'relative', background: '#800000', display: 'flex', flexDirection: 'column' }}>
        
        {/* UPPER DASHBOARD: Image Container */}
        <div style={{ height: '50%', width: '100%', background: '#000', position: 'relative', overflow: 'hidden', borderBottom: '4px solid #D4AF37' }}>
          {upperImage ? (
            <img src={upperImage} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Sassy Pad Upper" />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#333' }}>[ 4K BACKGROUND RESERVED ]</div>
          )}
          <div style={{ position: 'absolute', bottom: '20px', left: '30px', color: '#D4AF37', textShadow: '2px 2px 4px black' }}>
            <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 'bold' }}>DREAMTEAM</h1>
          </div>
        </div>

        {/* LOWER DASHBOARD: Content & Instructions */}
        <div style={{ height: '50%', width: '100%', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <p style={{ color: '#f5e27a', fontSize: '20px', fontStyle: 'italic', maxWidth: '600px', lineHeight: '1.6' }}>
                "Operational excellence is the standard. Every document in the audit library is formatted for zero-bleed A4 output."
            </p>
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
                <div style={{ padding: '15px 30px', border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '12px' }}>SELECT FILE TO REVIEW</div>
                <div style={{ padding: '15px 30px', border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '12

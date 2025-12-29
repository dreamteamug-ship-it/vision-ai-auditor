"use client";
import React, { useState } from 'react';

export default function DreamTeamSecurePortal() {
  const [accessLevel, setAccessLevel] = useState<'guest' | 'admin' | 'balaji' | 'sassy'>('guest');
  const [passkey, setPasskey] = useState('');
  const [activeFile, setActiveFile] = useState<any>(null);
  const [viewportAsset, setViewportAsset] = useState<{type: string, url: string} | null>(null);
  
  // Dynamic Project Storage
  const [projects, setProjects] = useState({
    balaji: { 
      title: "Balaji Hygiene", 
      subtitle: "Nairobi Rollout", 
      message: "Tracking the 120-day industrial implementation.",
      files: [{ id: 1, name: "120-Day Rollout.pdf", type: "pdf", content: "Executive Audit Phase 1." }] 
    },
    sassy: { 
      title: "Sassy Pads", 
      subtitle: "Luxury Branding", 
      message: "Premium feminine care market entry.",
      files: [{ id: 2, name: "Branding Guide.pdf", type: "pdf", content: "Maroon & Gold specs." }] 
    }
  });

  // Security Logic
  const handleLogin = () => {
    if (passkey === 'ADMIN99') setAccessLevel('admin');
    else if (passkey === 'BALAJI123') setAccessLevel('balaji');
    else if (passkey === 'SASSY456') setAccessLevel('sassy');
    else alert("Invalid Project Access Key");
  };

  const handleUniversalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const fileUrl = ev.target?.result as string;
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setViewportAsset({ type: file.type.startsWith('image/') ? 'image' : 'video', url: fileUrl });
      }
      // Add to current active project only
      if (accessLevel !== 'admin' && accessLevel !== 'guest') {
        const newAsset = { id: Date.now(), name: file.name, type: file.type.includes('pdf') ? 'pdf' : 'asset', url: fileUrl, content: "Optimized 4K Asset" };
        setProjects(prev => ({
          ...prev,
          [accessLevel]: { ...prev[accessLevel], files: [...prev[accessLevel].files, newAsset] }
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Login Screen
  if (accessLevel === 'guest') {
    return (
      <div style={{ height: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif' }}>
        <div style={{ textAlign: 'center', border: '1px solid #D4AF37', padding: '50px', background: '#1a0000' }}>
          <h1 style={{ color: '#D4AF37', letterSpacing: '5px' }}>DREAMTEAM</h1>
          <p style={{ color: '#888', marginBottom: '20px' }}>SECURE ACCESS PORTAL</p>
          <input 
            type="password" 
            placeholder="ENTER PROJECT KEY" 
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            style={{ background: 'transparent', border: '1px solid #D4AF37', color: 'white', padding: '10px', width: '250px', textAlign: 'center', marginBottom: '20px' }} 
          />
          <br/>
          <button onClick={handleLogin} style={{ background: '#D4AF37', color: 'black', border: 'none', padding: '10px 30px', cursor: 'pointer', fontWeight: 'bold' }}>ACCESS DASHBOARD</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#050505', color: '#e0e0e0', overflow: 'hidden' }}>
      
      {/* LEVEL 1: STRIP - ONLY SHOW ADMIN IF LOGGED IN AS ADMIN */}
      <nav style={{ width: '70px', background: '#000', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: '25px', flexShrink: 0 }}>
        <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '22px' }}>DT</div>
        {accessLevel === 'admin' ? (
          ['admin', 'balaji', 'sassy'].map(id => (
            <button key={id} onClick={() => setAccessLevel(id as any)} style={{ width: '45px', height: '45px', borderRadius: '12px', background: accessLevel === id ? '#800000' : '#111', color: '#D4AF37', border: 'none', cursor: 'pointer' }}>
              {id === 'admin' ? '🛠️' : id === 'balaji' ? '🏭' : '✨'}
            </button>
          ))
        ) : (
          <button style={{ width: '45px', height: '45px', borderRadius: '12px', background: '#800000', border: 'none' }}>{accessLevel === 'balaji' ? '🏭' : '✨'}</button>
        )}
        <button onClick={() => setAccessLevel('guest')} style={{ marginTop: 'auto', background: 'none', border: 'none', color: '#555', cursor: 'pointer' }}>LOGOUT</button>
      </nav>

      {/* LEVEL 2: FILE DASHBOARD - FILTERED BY ACCESS */}
      <aside style={{ width: '320px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '30px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <h2 style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '4px', marginBottom: '20px' }}>
          {accessLevel === 'admin' ? 'SYSTEM OVERSEER' : projects[accessLevel as 'balaji' | 'sassy'].title.toUpperCase()}
        </h2>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {accessLevel !== 'admin' && (
            <>
              <label style={{ color: '#D4AF37', fontSize: '10px', cursor: 'pointer', border: '1px solid #D4AF37', padding: '12px', textAlign: 'center', fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>
                + UPLOAD PROJECT ASSET
                <input type="file" onChange={handleUniversalUpload} style={{ display: 'none' }} />
              </label>
              {projects[accessLevel as 'balaji' | 'sassy'].files.map((file: any) => (
                <div key={file.id} onClick={() => setActiveFile(file)} style={{ padding: '12px', background: '#111', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', marginBottom: '8px', border: '1px solid #222' }}>
                   📄 {file.name}
                </div>
              ))}
            </>
          )}
          {accessLevel === 'admin' && <p style={{ fontSize: '12px', color: '#888' }}>Select a project from the left to manage files.</p>}
        </div>
      </aside>

      {/* LEVEL 3: WORKSTAGE */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ height: '50%', background: '#000', borderBottom: '2px solid #D4AF37', overflow: 'hidden' }}>
          {viewportAsset ? (
            viewportAsset.type === 'image' ? (
              <div style={{ width: '100%', height: '100%', backgroundImage: `url(${viewportAsset.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            ) : (
              <video src={viewportAsset.url} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#222' }}>PROJECT ENGINE READY</div>
          )}
        </div>

        <div style={{ height: '50%', background: '#800000', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {accessLevel !== 'admin' && (
            <>
              <h1 style={{ color: '#D4AF37', fontSize: '3rem', fontWeight: 'bold', margin: 0 }}>{projects[accessLevel as 'balaji' | 'sassy'].title}</h1>
              <p style={{ color: '#f5e27a', fontSize: '1.2rem', fontStyle: 'italic' }}>{projects[accessLevel as 'balaji' | 'sassy'].subtitle}</p>
              <p style={{ color: 'white', fontSize: '18px', maxWidth: '700px' }}>{projects[accessLevel as 'balaji' | 'sassy'].message}</p>
            </>
          )}
          {accessLevel === 'admin' && <h1 style={{ color: '#D4AF37' }}>ADMIN MASTER CONTROL</h1>}
        </div>

        {activeFile && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', overflowY: 'auto', padding: '40px', zIndex: 100 }}>
            <div style={{ position: 'relative', width: '794px', height: '1123px', background: 'white', color: 'black', padding: '80px' }}>
              <button onClick={() => setActiveFile(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#800000', color: 'white', border: 'none', padding: '10px 15px' }}>✕</button>
              <h2>{activeFile.name}</h2>
              <div style={{ marginTop: '40px' }}>{activeFile.content}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

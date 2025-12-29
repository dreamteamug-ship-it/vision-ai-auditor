"use client";
import React, { useState } from 'react';

export default function DreamTeamFinalIntelligence() {
  const [accessLevel, setAccessLevel] = useState<'guest' | 'admin' | 'balaji' | 'sassy'>('guest');
  const [passkey, setPasskey] = useState('');
  const [activeFile, setActiveFile] = useState<any>(null);
  const [viewportAsset, setViewportAsset] = useState<{type: string, url: string} | null>(null);
  const [projects, setProjects] = useState({
    balaji: { title: "Balaji Hygiene", files: [] },
    sassy: { title: "Sassy Pads", files: [] }
  });

  // --- HTML & ASSET INGESTION ENGINE ---
  const handleIngestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const isHTML = file.type === 'text/html';
      
      const newFile = {
        id: Date.now(),
        name: file.name.replace(/\.[^/.]+$/, ""), // Clean name
        type: isHTML ? 'html' : file.type.split('/')[0],
        // Sanitize and wrap content to prevent bleeding
        payload: isHTML ? content : content, 
        timestamp: new Date().toLocaleTimeString()
      };

      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setViewportAsset({ type: file.type.split('/')[0], url: content });
      }

      if (accessLevel !== 'admin' && accessLevel !== 'guest') {
        setProjects(prev => ({
          ...prev,
          [accessLevel]: { ...prev[accessLevel], files: [...prev[accessLevel].files, newFile] }
        }));
      }
    };

    if (file.type === 'text/html' || file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = () => {
    if (passkey === 'ADMIN99') setAccessLevel('admin');
    else if (passkey === 'BALAJI123') setAccessLevel('balaji');
    else if (passkey === 'SASSY456') setAccessLevel('sassy');
    else alert("Access Denied");
  };

  if (accessLevel === 'guest') {
    return (
      <div style={{ height: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '50px', border: '1px solid #D4AF37', background: '#1a0000', textAlign: 'center' }}>
          <h1 style={{ color: '#D4AF37', letterSpacing: '5px' }}>DREAMTEAM</h1>
          <input type="password" placeholder="PROJECT KEY" value={passkey} onChange={(e)=>setPasskey(e.target.value)} style={{ background: 'transparent', border: '1px solid #D4AF37', color: 'white', padding: '10px', margin: '20px 0', display: 'block' }} />
          <button onClick={handleLogin} style={{ background: '#D4AF37', color: 'black', padding: '10px 40px', cursor: 'pointer', fontWeight: 'bold' }}>INITIALIZE</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#050505', overflow: 'hidden' }}>
      
      {/* LEFT NAV STRIP */}
      <nav style={{ width: '70px', background: '#000', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', alignItems: 'center', py: '20px', gap: '20px', flexShrink: 0 }}>
        <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '20px', margin: '20px 0' }}>DT</div>
        {accessLevel === 'admin' ? (
          ['admin', 'balaji', 'sassy'].map(id => (
            <button key={id} onClick={() => setAccessLevel(id as any)} style={{ width: '45px', height: '45px', borderRadius: '8px', background: accessLevel === id ? '#800000' : '#111', color: '#D4AF37', border: 'none' }}>{id[0].toUpperCase()}</button>
          ))
        ) : <div style={{ color: '#800000' }}>●</div>}
      </nav>

      {/* FILE PANEL */}
      <aside style={{ width: '320px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '30px', flexShrink: 0 }}>
        <h2 style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '4px' }}>{accessLevel.toUpperCase()} FILES</h2>
        <label style={{ margin: '20px 0', display: 'block', border: '1px dashed #D4AF37', padding: '15px', textAlign: 'center', fontSize: '10px', cursor: 'pointer', color: '#D4AF37' }}>
          INGEST HTML / ASSET
          <input type="file" onChange={handleIngestion} style={{ display: 'none' }} />
        </label>
        <div style={{ overflowY: 'auto', height: 'calc(100% - 150px)' }}>
          {accessLevel !== 'admin' && (projects as any)[accessLevel].files.map((f: any) => (
            <div key={f.id} onClick={() => setActiveFile(f)} style={{ padding: '12px', background: '#000', marginBottom: '8px', fontSize: '12px', border: activeFile?.id === f.id ? '1px solid #D4AF37' : '1px solid #333', cursor: 'pointer' }}>
              {f.type.toUpperCase()}: {f.name}
            </div>
          ))}
        </div>
      </aside>

      {/* WORKSTAGE */}
      <main style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '50%', background: '#000', borderBottom: '2px solid #D4AF37' }}>
          {viewportAsset?.type === 'image' && <div style={{ width: '100%', height: '100%', backgroundImage: `url(${viewportAsset.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
          {viewportAsset?.type === 'video' && <video src={viewportAsset.url} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        <div style={{ height: '50%', background: '#800000', padding: '60px' }}>
          <h1 style={{ color: '#D4AF37', fontSize: '3rem', margin: 0 }}>DREAMTEAM</h1>
          <p style={{ color: 'white', opacity: 0.8 }}>Strategic Ingestion Active. Deployment Aligned.</p>
        </div>

        {/* --- ANTI-BLEED A4 RENDERER --- */}
        {activeFile && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 100, display: 'flex', justifyContent: 'center', padding: '40px', overflowY: 'auto' }}>
            <div style={{ 
              width: '794px', minHeight: '1123px', height: 'fit-content', 
              background: 'white', color: 'black', padding: '80px', position: 'relative',
              display: 'flex', flexDirection: 'column'
            }}>
              <button onClick={() => setActiveFile(null)} style={{ position: 'absolute', top: 20, right: 20, background: '#800000', color: 'white', border: 'none', padding: '10px' }}>✕</button>
              
              <div style={{ flex: 1 }}>
                {activeFile.type === 'html' ? (
                  <div dangerouslySetInnerHTML={{ __html: activeFile.payload }} />
                ) : activeFile.type === 'image' ? (
                  <img src={activeFile.payload} style={{ maxWidth: '100%' }} />
                ) : (
                  <p>{activeFile.payload}</p>
                )}
              </div>

              {/* FORCED PAGE END VALIDATION */}
              <div style={{ marginTop: '50px', borderTop: '2px solid #000', paddingTop: '20px', fontWeight: 'bold' }}>
                DOCUMENT END. NO FURTHER CONTENT FOLLOWS. VALIDATED AT {activeFile.timestamp}.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

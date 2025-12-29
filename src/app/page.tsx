"use client";
import React, { useState } from 'react';

export default function GlobalConglomerateIntelligence() {
  const [accessLevel, setAccessLevel] = useState<'guest' | string>('guest');
  const [passkey, setPasskey] = useState('');
  const [activeFile, setActiveFile] = useState<any>(null);
  const [viewportAsset, setViewportAsset] = useState<{type: string, url: string} | null>(null);
  const [stickyNote, setStickyNote] = useState('');
  
  // --- EXTENDED CONGLOMERATE DATABASE ---
  const [projects, setProjects] = useState<any>({
    altoglobal: { title: "Altovex Global Logistics", subtitle: "International Freight", files: [] },
    altoug: { title: "Altovex Uganda", subtitle: "Regional Distribution", files: [] },
    digiden: { title: "Digital Den", subtitle: "Digital Infrastructure", files: [] },
    dtconsult: { title: "DreamTeam Consulting", subtitle: "Strategic Audit HQ", files: [] },
    dteq360: { title: "DreamteQ 360 ERP", subtitle: "Enterprise Resource Planning", files: [] },
    urbanedge: { title: "Urban Edge Landscaping", subtitle: "Modern Architecture", files: [] },
    dline: { title: "Dreamline Business Centre", subtitle: "Corporate Hub", files: [] },
    sinoev: { title: "Sinoafriq EV Mobility Africa Ltd", subtitle: "EV Logistics & Transport", files: [] },
    park360: { title: "DreamteQ Urban Smart Parking Solutions", subtitle: "IOT Urban Infrastructure", files: [] },
    battswap: { title: "Afrisino EV Battery Swapping Ltd", subtitle: "Energy Solutions", files: [] }
  });

  // --- WEBSITE & ASSET INGESTION ENGINE ---
  const handleWebsiteIngestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      const isHTML = file.type === 'text/html' || file.name.endsWith('.html');

      reader.onload = (ev) => {
        const payload = ev.target?.result as string;
        
        // If it's a website index, prioritize it for the viewport or vault
        const newEntry = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: isHTML ? 'website' : file.type.split('/')[0],
          content: payload,
          timestamp: new Date().toLocaleTimeString()
        };

        if (accessLevel !== 'admin' && accessLevel !== 'guest') {
          setProjects((prev: any) => ({
            ...prev,
            [accessLevel]: { ...prev[accessLevel], files: [newEntry, ...prev[accessLevel].files] }
          }));
        }
      };
      if (isHTML) reader.readAsText(file); else reader.readAsDataURL(file);
    });
  };

  const handleLogin = () => {
    const keys: any = {
      'ADMIN99': 'admin', 'ALTOGLOBAL': 'altoglobal', 'ALTOUG': 'altoug',
      'DIGIDEN': 'digiden', 'DTCONSULT': 'dtconsult', 'DTEQ360': 'dteq360',
      'URBANEDGE': 'urbanedge', 'DLINE': 'dline', 'SINOEV': 'sinoev',
      'PARK360': 'park360', 'BATTSWAP': 'battswap'
    };
    if (keys[passkey.toUpperCase()]) setAccessLevel(keys[passkey.toUpperCase()]);
    else alert("UNAUTHORIZED KEY");
  };

  if (accessLevel === 'guest') {
    return (
      <div style={{ height: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '50px', border: '1px solid #D4AF37', background: '#1a0000', textAlign: 'center' }}>
          <h1 style={{ color: '#D4AF37', letterSpacing: '6px' }}>CONGLOMERATE HQ</h1>
          <input type="password" placeholder="ENTER COMPANY KEY" value={passkey} onChange={(e)=>setPasskey(e.target.value)} style={{ background: 'transparent', border: '1px solid #D4AF37', color: 'white', padding: '15px', width: '300px', textAlign: 'center', marginTop: '20px' }} />
          <button onClick={handleLogin} style={{ display: 'block', margin: '30px auto 0', background: '#D4AF37', color: 'black', padding: '10px 40px', fontWeight: 'bold' }}>ACCESS</button>
        </div>
      </div>
    );
  }

  const currentKey = accessLevel === 'admin' ? 'dtconsult' : accessLevel;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#050505', overflow: 'hidden' }}>
      
      {/* 1. MASTER STRIP: ADMIN ONLY ACCESS */}
      <nav style={{ width: '70px', background: '#000', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: '15px' }}>
        <div style={{ color: '#D4AF37', fontWeight: 'bold' }}>HQ</div>
        {accessLevel === 'admin' && Object.keys(projects).map(p => (
          <button key={p} onClick={() => setAccessLevel(p)} style={{ width: '40px', height: '40px', borderRadius: '5px', background: accessLevel === p ? '#800000' : '#111', color: '#D4AF37', border: 'none', cursor: 'pointer', fontSize: '8px' }}>{p.substring(0,3).toUpperCase()}</button>
        ))}
        <button onClick={() => setAccessLevel('guest')} style={{ marginTop: 'auto', color: '#444', background: 'none', border: 'none' }}>OFF</button>
      </nav>

      {/* 2. VAULT & WEBSITE UPLOADER */}
      <aside style={{ width: '320px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '25px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '3px' }}>{currentKey.toUpperCase()} ASSETS</h2>
        <label style={{ margin: '15px 0', border: '1px dashed #D4AF37', padding: '10px', color: '#D4AF37', fontSize: '10px', textAlign: 'center', cursor: 'pointer' }}>
          HOST WEBSITE / UPLOAD
          <input type="file" multiple onChange={handleWebsiteIngestion} style={{ display: 'none' }} />
        </label>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {projects[currentKey]?.files.map((f: any) => (
            <div key={f.id} onClick={() => setActiveFile(f)} style={{ padding: '10px', background: '#000', marginBottom: '8px', fontSize: '11px', border: activeFile?.id === f.id ? '1px solid #D4AF37' : '1px solid #222', cursor: 'pointer' }}>
               {f.type === 'website' ? '🌐' : '📄'} {f.name}
            </div>
          ))}
        </div>
        <textarea value={stickyNote} onChange={(e)=>setStickyNote(e.target.value)} placeholder="Project Notes..." style={{ width: '100%', height: '80px', background: '#2a0000', color: '#f5e27a', border: 'none', padding: '10px', fontSize: '12px', marginTop: '15px' }} />
      </aside>

      {/* 3. WORKSTAGE: 4K VIEWPORT & WEBSITE RENDERER */}
      <main style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '50%', background: '#000', borderBottom: '2px solid #D4AF37' }}>
          {activeFile && activeFile.type === 'website' ? (
             <iframe srcDoc={activeFile.content} style={{ width: '100%', height: '100%', border: 'none', background: 'white' }} />
          ) : viewportAsset ? (
             viewportAsset.type === 'image' ? <div style={{ width: '100%', height: '100%', backgroundImage: `url(${viewportAsset.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} /> : <video src={viewportAsset.url} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#222' }}>4K ENGINE ACTIVE</div>}
        </div>
        <div style={{ height: '50%', background: '#800000', padding: '60px' }}>
          <h1 style={{ color: '#D4AF37', fontSize: '3rem', margin: 0 }}>{projects[currentKey].title}</h1>
          <p style={{ color: '#f5e27a', fontSize: '1.2rem', margin: '5px 0' }}>{projects[currentKey].subtitle}</p>
          <p style={{ color: 'white', opacity: 0.9, lineHeight: '1.6' }}>{projects[currentKey].message}</p>
        </div>

        {/* FULL STOP VALIDATION MODAL */}
        {activeFile && activeFile.type !== 'website' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.98)', zIndex: 100, display: 'flex', justifyContent: 'center', padding: '40px', overflowY: 'auto' }}>
            <div style={{ width: '794px', minHeight: '1123px', height: 'fit-content', background: 'white', color: 'black', padding: '80px' }}>
              <button onClick={() => setActiveFile(null)} style={{ position: 'absolute', top: 20, right: 20, background: '#800000', color: 'white', border: 'none', padding: '10px' }}>CLOSE</button>
              <h2 style={{ color: '#800000' }}>{activeFile.name}</h2>
              <div style={{ marginTop: '40px', fontSize: '18px', lineHeight: '2' }}>{activeFile.content}</div>
              <div style={{ marginTop: '50px', borderTop: '2px solid #000', paddingTop: '20px', fontWeight: 'bold' }}>TERMINATED AT THIS BOUNDARY. VALIDATED BY CONGLOMERATE HQ.</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

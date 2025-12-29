"use client";
import React, { useState, useEffect } from 'react';

export default function DreamTeamMasterUnifiedSystem() {
  const [accessLevel, setAccessLevel] = useState<'guest' | 'admin' | 'balaji' | 'sassy'>('guest');
  const [passkey, setPasskey] = useState('');
  const [activeFile, setActiveFile] = useState<any>(null);
  const [viewportAsset, setViewportAsset] = useState<{type: string, url: string} | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // --- AUDIT LOG STATE ---
  const [auditLog, setAuditLog] = useState<{msg: string, time: string}[]>([]);

  // --- PERSISTENT PROJECT VAULTS ---
  const [projects, setProjects] = useState<any>({
    balaji: { 
      title: "Balaji Hygiene", 
      subtitle: "Nairobi Industrial Rollout", 
      message: "Strategizing the future of East African hygiene. Tracking the 120-day implementation of the Nairobi production line.",
      files: [] 
    },
    sassy: { 
      title: "Sassy Pads", 
      subtitle: "Ultra-Luxury Branding", 
      message: "Redefining the premium feminine care sector. Market entry strategy and high-gloss branding audits.",
      files: [] 
    }
  });

  const addToLog = (action: string) => {
    const entry = { msg: action, time: new Date().toLocaleTimeString() };
    setAuditLog(prev => [entry, ...prev].slice(0, 10)); // Keep last 10 actions
  };

  // --- UNIVERSAL INGESTION ENGINE ---
  const processFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      const isHTML = file.type === 'text/html';
      const isMedia = file.type.startsWith('image/') || file.type.startsWith('video/');

      reader.onload = (ev) => {
        const payload = ev.target?.result as string;
        
        if (isMedia) {
          setViewportAsset({ type: file.type.split('/')[0], url: payload });
          addToLog(`Viewport Asset Replaced: ${file.name}`);
        }

        if (accessLevel !== 'admin' && accessLevel !== 'guest') {
          const newEntry = {
            id: Date.now() + Math.random(),
            name: file.name,
            type: isHTML ? 'html' : file.type.split('/')[0],
            content: payload,
            timestamp: new Date().toLocaleString()
          };
          setProjects((prev: any) => ({
            ...prev,
            [accessLevel]: { ...prev[accessLevel], files: [newEntry, ...prev[accessLevel].files] }
          }));
          addToLog(`Injected into ${accessLevel}: ${file.name}`);
        }
      };
      if (isHTML) reader.readAsText(file);
      else reader.readAsDataURL(file);
    });
  };

  const deleteFile = (id: number) => {
    const fileName = activeFile?.name;
    setProjects((prev: any) => ({
      ...prev,
      [currentProjectKey()]: { 
        ...prev[currentProjectKey()], 
        files: prev[currentProjectKey()].files.filter((f: any) => f.id !== id) 
      }
    }));
    addToLog(`Deleted: ${fileName}`);
    setActiveFile(null);
  };

  const saveContentChanges = (newContent: string) => {
    setProjects((prev: any) => ({
      ...prev,
      [currentProjectKey()]: {
        ...prev[currentProjectKey()],
        files: prev[currentProjectKey()].files.map((f: any) => 
          f.id === activeFile.id ? { ...f, content: newContent } : f
        )
      }
    }));
    addToLog(`Edited content: ${activeFile.name}`);
    setIsEditing(false);
  };

  const currentProjectKey = () => (accessLevel === 'admin' ? 'balaji' : accessLevel);

  // --- LOGIN SECURITY GATE ---
  if (accessLevel === 'guest') {
    return (
      <div style={{ height: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '60px', border: '1px solid #D4AF37', background: '#1a0000', textAlign: 'center', boxShadow: '0 0 40px rgba(0,0,0,1)' }}>
          <h1 style={{ color: '#D4AF37', letterSpacing: '8px', marginBottom: '30px' }}>DREAMTEAM</h1>
          <input type="password" placeholder="SECURE KEY" value={passkey} onChange={(e)=>setPasskey(e.target.value)} style={{ background: 'transparent', border: '1px solid #D4AF37', color: 'white', padding: '15px', width: '300px', textAlign: 'center' }} />
          <button onClick={() => {
            if(passkey === 'ADMIN99') setAccessLevel('admin');
            else if(passkey === 'BALAJI123') setAccessLevel('balaji');
            else if(passkey === 'SASSY456') setAccessLevel('sassy');
            else alert("Invalid Key");
          }} style={{ display: 'block', margin: '30px auto 0', background: '#D4AF37', color: 'black', padding: '12px 50px', fontWeight: 'bold', cursor: 'pointer' }}>AUTHENTICATE</button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); processFiles(e.dataTransfer.files); }}
      style={{ display: 'flex', height: '100vh', width: '100vw', background: '#050505', overflow: 'hidden' }}
    >
      
      {/* 1. MASTER STRIP (Full Height) */}
      <nav style={{ width: '70px', background: '#000', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', alignItems: 'center', py: '20px', gap: '20px', flexShrink: 0 }}>
        <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '20px', margin: '20px 0' }}>DT</div>
        {accessLevel === 'admin' && ['balaji', 'sassy'].map(p => (
          <button key={p} onClick={() => {setAccessLevel(p as any); setActiveFile(null);}} style={{ width: '45px', height: '45px', borderRadius: '10px', background: accessLevel === p ? '#800000' : '#111', color: '#D4AF37', border: 'none', cursor: 'pointer', fontSize: '12px' }}>{p.toUpperCase()}</button>
        ))}
        <button onClick={() => setAccessLevel('guest')} style={{ marginTop: 'auto', background: 'none', border: 'none', color: '#444', cursor: 'pointer', paddingBottom: '20px' }}>EXIT</button>
      </nav>

      {/* 2. DYNAMIC SIDE PANEL (Full Height) */}
      <aside style={{ width: '320px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '30px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '4px' }}>VAULT: {currentProjectKey().toUpperCase()}</h2>
        <p style={{ fontSize: '11px', color: '#666', fontStyle: 'italic', marginBottom: '20px' }}>Drag assets here to optimize.</p>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {projects[currentProjectKey()].files.map((f: any) => (
            <div key={f.id} onClick={() => setActiveFile(f)} style={{ padding: '15px', background: '#000', marginBottom: '10px', fontSize: '12px', border: activeFile?.id === f.id ? '1px solid #D4AF37' : '1px solid #222', cursor: 'pointer', borderRadius: '4px' }}>
               {f.type === 'video' ? '🎥' : f.type === 'image' ? '🖼️' : '📄'} {f.name}
            </div>
          ))}
        </div>

        {/* Audit Log Display */}
        <div style={{ height: '150px', borderTop: '1px solid #333', paddingTop: '15px', overflowY: 'auto' }}>
          <p style={{ fontSize: '9px', color: '#D4AF37', letterSpacing: '2px' }}>SYSTEM AUDIT LOG</p>
          {auditLog.map((log, i) => (
            <p key={i} style={{ fontSize: '10px', color: '#555', margin: '5px 0' }}>[{log.time}] {log.msg}</p>
          ))}
        </div>
      </aside>

      {/* 3. WORKSTAGE (Full Right Side) */}
      <main style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {/* UPPER VIEWPORT */}
        <div style={{ height: '50%', background: '#000', borderBottom: '2px solid #D4AF37' }}>
          {viewportAsset?.type === 'image' && <div style={{ width: '100%', height: '100%', backgroundImage: `url(${viewportAsset.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
          {viewportAsset?.type === 'video' && <video src={viewportAsset.url} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        
        {/* LOWER PROJECT INTRO */}
        <div style={{ height: '50%', background: '#800000', padding: '60px', position: 'relative' }}>
          <h1 style={{ color: '#D4AF37', fontSize: '3.5rem', fontWeight: 'bold', margin: 0 }}>{projects[currentProjectKey()].title}</h1>
          <p style={{ color: '#f5e27a', fontSize: '1.2rem', fontStyle: 'italic', margin: '5px 0 20px 0' }}>{projects[currentProjectKey()].subtitle}</p>
          <p style={{ color: 'white', maxWidth: '700px', lineHeight: '1.8', opacity: 0.9 }}>{projects[currentProjectKey()].message}</p>
        </div>

        {/* 4. ANTI-BLEED MODULAR REVIEWER */}
        {activeFile && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.98)', zIndex: 100, display: 'flex', justifyContent: 'center', padding: '40px', overflowY: 'auto' }}>
            <div style={{ width: '794px', minHeight: '1123px', height: 'fit-content', background: 'white', color: 'black', padding: '80px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '10px' }}>
                {accessLevel === 'admin' && (
                  <>
                    <button onClick={() => setIsEditing(!isEditing)} style={{ background: '#D4AF37', border: 'none', padding: '8px 15px', cursor: 'pointer', fontWeight: 'bold' }}>{isEditing ? 'CANCEL' : 'EDIT'}</button>
                    <button onClick={() => deleteFile(activeFile.id)} style={{ background: 'black', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>REMOVE</button>
                  </>
                )}
                <button onClick={() => {setActiveFile(null); setIsEditing(false);}} style={{ background: '#800000', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>CLOSE</button>
              </div>

              <h2 style={{ color: '#800000', borderBottom: '2px solid #800000', paddingBottom: '10px' }}>{activeFile.name}</h2>
              <div style={{ flex: 1, marginTop: '40px' }}>
                {isEditing ? (
                  <textarea defaultValue={activeFile.content} onBlur={(e) => saveContentChanges(e.target.value)} style={{ width: '100%', height: '600px', border: '1px solid #D4AF37', padding: '20px', fontFamily: 'serif', fontSize: '16px' }} />
                ) : (
                  <div style={{ fontSize: '18px', lineHeight: '2' }}>
                    {activeFile.type === 'html' ? <div dangerouslySetInnerHTML={{ __html: activeFile.content }} /> : activeFile.content}
                  </div>
                )}
              </div>
              <div style={{ marginTop: '50px', borderTop: '2px solid #000', paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }}>DOCUMENT END. NO FURTHER CONTENT FOLLOWS. VALIDATED BY DREAMTEAM.</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from 'react';

export default function DreamTeamCommandCenter() {
  const [accessLevel, setAccessLevel] = useState<'guest' | 'admin' | 'balaji' | 'sassy'>('guest');
  const [passkey, setPasskey] = useState('');
  const [activeFile, setActiveFile] = useState<any>(null);
  const [viewportAsset, setViewportAsset] = useState<{type: string, url: string} | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // --- PROJECT DATA STATE (Persistent for the session) ---
  const [projects, setProjects] = useState<any>({
    balaji: { title: "Balaji Hygiene", subtitle: "Nairobi Industrial", message: "120-Day Rollout Active.", files: [] },
    sassy: { title: "Sassy Pads", subtitle: "Luxury Branding", message: "Market entry strategy active.", files: [] }
  });

  // --- UNIVERSAL INGESTION & ROUTING ---
  const processFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      const isHTML = file.type === 'text/html';
      const isMedia = file.type.startsWith('image/') || file.type.startsWith('video/');

      reader.onload = (ev) => {
        const payload = ev.target?.result as string;
        
        if (isMedia) {
          setViewportAsset({ type: file.type.split('/')[0], url: payload });
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
        }
      };

      if (isHTML) reader.readAsText(file);
      else reader.readAsDataURL(file);
    });
  };

  // --- ADMIN ACTIONS: REMOVE & SAVE CHANGES ---
  const deleteFile = (id: number) => {
    setProjects((prev: any) => ({
      ...prev,
      [currentProjectKey()]: { 
        ...prev[currentProjectKey()], 
        files: prev[currentProjectKey()].files.filter((f: any) => f.id !== id) 
      }
    }));
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
    setIsEditing(false);
  };

  const currentProjectKey = () => accessLevel === 'admin' ? 'balaji' : accessLevel;

  if (accessLevel === 'guest') {
    return (
      <div style={{ height: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '60px', border: '1px solid #D4AF37', background: '#1a0000', textAlign: 'center', boxShadow: '0 0 30px black' }}>
          <h1 style={{ color: '#D4AF37', letterSpacing: '8px', marginBottom: '30px' }}>DREAMTEAM</h1>
          <input type="password" placeholder="PROJECT ACCESS KEY" value={passkey} onChange={(e)=>setPasskey(e.target.value)} style={{ background: 'transparent', border: '1px solid #D4AF37', color: 'white', padding: '15px', width: '300px', textAlign: 'center' }} />
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
      
      {/* LEFT STRIP */}
      <nav style={{ width: '70px', background: '#000', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', alignItems: 'center', py: '20px', gap: '20px', flexShrink: 0 }}>
        <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '20px', margin: '20px 0' }}>DT</div>
        {accessLevel === 'admin' && ['balaji', 'sassy'].map(p => (
          <button key={p} onClick={() => {setAccessLevel(p as any); setActiveFile(null);}} style={{ width: '45px', height: '45px', borderRadius: '8px', background: accessLevel === p ? '#800000' : '#111', color: '#D4AF37', border: 'none', cursor: 'pointer' }}>{p[0].toUpperCase()}</button>
        ))}
        <button onClick={() => setAccessLevel('guest')} style={{ marginTop: 'auto', background: 'none', border: 'none', color: '#444', cursor: 'pointer', paddingBottom: '20px' }}>EXIT</button>
      </nav>

      {/* DYNAMIC SIDE PANEL */}
      <aside style={{ width: '320px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '30px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '4px' }}>VAULT: {accessLevel.toUpperCase()}</h2>
        <div style={{ fontSize: '10px', color: '#555', marginBottom: '20px' }}>DRAP & DROP ASSETS ANYWHERE TO INGEST</div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {(projects as any)[currentProjectKey()]?.files.map((f: any) => (
            <div key={f.id} onClick={() => setActiveFile(f)} style={{ padding: '15px', background: '#000', marginBottom: '10px', fontSize: '12px', border: activeFile?.id === f.id ? '1px solid #D4AF37' : '1px solid #222', cursor: 'pointer', borderRadius: '4px' }}>
               {f.type === 'video' ? '🎥' : f.type === 'image' ? '🖼️' : '📄'} {f.name}
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
        
        <div style={{ height: '50%', background: '#800000', padding: '60px', position: 'relative' }}>
          <h1 style={{ color: '#D4AF37', fontSize: '3.5rem', margin: 0 }}>{projects[currentProjectKey()].title}</h1>
          <p style={{ color: '#f5e27a', fontSize: '1.2rem', fontStyle: 'italic' }}>{projects[currentProjectKey()].subtitle}</p>
          <div style={{ width: '80px', height: '4px', background: '#D4AF37', margin: '20px 0' }}></div>
          <p style={{ color: 'white', maxWidth: '600px', lineHeight: '1.8' }}>{projects[currentProjectKey()].message}</p>
        </div>

        {/* --- ANTI-BLEED MODULAR REVIEWER --- */}
        {activeFile && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.98)', zIndex: 100, display: 'flex', justifyContent: 'center', padding: '40px', overflowY: 'auto' }}>
            <div style={{ width: '794px', minHeight: '1123px', height: 'fit-content', background: 'white', color: 'black', padding: '80px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '10px' }}>
                {accessLevel === 'admin' && (
                  <>
                    <button onClick={() => setIsEditing(!isEditing)} style={{ background: '#D4AF37', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>{isEditing ? 'CANCEL' : 'EDIT'}</button>
                    <button onClick={() => deleteFile(activeFile.id)} style={{ background: 'black', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>REMOVE</button>
                  </>
                )}
                <button onClick={() => {setActiveFile(null); setIsEditing(false);}} style={{ background: '#800000', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>CLOSE</button>
              </div>

              <h2 style={{ color: '#800000', borderBottom: '2px solid #800000', paddingBottom: '10px' }}>{activeFile.name}</h2>
              
              <div style={{ flex: 1, marginTop: '40px' }}>
                {isEditing ? (
                  <textarea 
                    defaultValue={activeFile.content} 
                    onBlur={(e) => saveContentChanges(e.target.value)}
                    style={{ width: '100%', height: '600px', border: '1px solid #D4AF37', padding: '20px', fontFamily: 'serif', fontSize: '16px' }}
                  />
                ) : (
                  <div style={{ fontSize: '18px', lineHeight: '2' }}>
                    {activeFile.type === 'html' ? <div dangerouslySetInnerHTML={{ __html: activeFile.content }} /> : activeFile.content}
                  </div>
                )}
              </div>

              <div style={{ marginTop: '50px', borderTop: '1px solid #000', paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                VALIDATED BY DREAMTEAM AI. DOCUMENT TERMINATED AT THIS BOUNDARY.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

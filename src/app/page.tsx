"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Ensure this file exists in your lib folder

export default function GlobalConglomerateMaster() {
  // --- AUTH & STATE ---
  const [accessLevel, setAccessLevel] = useState<'guest' | string>('guest');
  const [passkey, setPasskey] = useState('');
  const [activeFile, setActiveFile] = useState<any>(null);
  const [vaultFiles, setVaultFiles] = useState<any[]>([]);
  const [viewportAsset, setViewportAsset] = useState<{type: string, url: string} | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [stickyNote, setStickyNote] = useState('');
  const [auditLog, setAuditLog] = useState<{msg: string, time: string}[]>([]);

  // --- ACCESS KEYS REGISTRY ---
  const COMPANY_KEYS: any = {
    'ADMIN99': 'admin',
    'ALTOGLOBAL': 'altoglobal',
    'ALTOUG': 'altoug',
    'DIGIDEN': 'digiden',
    'DTCONSULT': 'dtconsult',
    'DTEQ360': 'dteq360',
    'URBANEDGE': 'urbanedge',
    'DLINE': 'dline',
    'SINOEV': 'sinoev',
    'PARK360': 'park360',
    'BATTSWAP': 'battswap'
  };

  const addToLog = (action: string) => {
    setAuditLog(prev => [{ msg: action, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 5));
  };

  // --- CLOUD OPERATIONS ---
  const fetchVault = async (companyKey: string) => {
    const keyToFetch = companyKey === 'admin' ? 'dtconsult' : companyKey;
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('company_key', keyToFetch)
      .order('created_at', { ascending: false });
    
    if (data) setVaultFiles(data);
  };

  const syncToCloud = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || accessLevel === 'guest') return;

    setIsSyncing(true);
    const targetKey = accessLevel === 'admin' ? 'dtconsult' : accessLevel;

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${targetKey}/${fileName}`;
      
      // 1. Storage Upload
      const { data: storageData, error: storageError } = await supabase.storage
        .from('conglomerate-vault')
        .upload(filePath, file);

      if (storageData) {
        const { data: { publicUrl } } = supabase.storage
          .from('conglomerate-vault')
          .getPublicUrl(filePath);

        // 2. Database Entry
        await supabase.from('assets').insert([{
          name: file.name,
          url: publicUrl,
          type: file.type.includes('html') ? 'website' : file.type.split('/')[0],
          company_key: targetKey
        }]);
        
        addToLog(`Cloud Verified: ${file.name}`);
      }
    }
    fetchVault(targetKey);
    setIsSyncing(false);
  };

  const deleteAsset = async (id: string, url: string) => {
    const fileName = url.split('/').pop();
    const targetKey = accessLevel === 'admin' ? 'dtconsult' : accessLevel;
    
    // Remove from DB
    await supabase.from('assets').delete().eq('id', id);
    // Remove from Storage
    await supabase.storage.from('conglomerate-vault').remove([`${targetKey}/${fileName}`]);
    
    addToLog(`Removed: ${fileName}`);
    setActiveFile(null);
    fetchVault(targetKey);
  };

  useEffect(() => {
    if (accessLevel !== 'guest') fetchVault(accessLevel);
  }, [accessLevel]);

  // --- LOGIN UI ---
  if (accessLevel === 'guest') {
    return (
      <div style={{ height: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '60px', border: '1px solid #D4AF37', background: '#1a0000', textAlign: 'center', boxShadow: '0 0 50px black' }}>
          <h1 style={{ color: '#D4AF37', letterSpacing: '8px', marginBottom: '10px' }}>CONGLOMERATE HQ</h1>
          <p style={{ color: '#666', fontSize: '11px', marginBottom: '30px' }}>ENTER SECURE ACCESS IDENTIFIER</p>
          <input 
            type="password" 
            placeholder="ACCESS KEY" 
            value={passkey} 
            onChange={(e)=>setPasskey(e.target.value.toUpperCase())} 
            style={{ background: 'transparent', border: '1px solid #D4AF37', color: 'white', padding: '15px', width: '300px', textAlign: 'center' }} 
          />
          <button 
            onClick={() => COMPANY_KEYS[passkey] ? setAccessLevel(COMPANY_KEYS[passkey]) : alert("INVALID KEY")} 
            style={{ display: 'block', margin: '30px auto 0', background: '#D4AF37', color: 'black', padding: '12px 50px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
          >
            AUTHENTICATE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#050505', color: 'white', overflow: 'hidden' }}>
      
      {/* LEFT NAV: ADMIN CONSOLE */}
      <nav style={{ width: '70px', background: '#000', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: '15px', flexShrink: 0 }}>
        <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '18px', marginBottom: '20px' }}>HQ</div>
        {accessLevel === 'admin' && Object.keys(COMPANY_KEYS).filter(k => k !== 'ADMIN99').map(k => (
          <button 
            key={k} 
            onClick={() => setAccessLevel(COMPANY_KEYS[k])} 
            style={{ width: '40px', height: '40px', borderRadius: '8px', background: accessLevel === COMPANY_KEYS[k] ? '#800000' : '#111', color: '#D4AF37', border: 'none', cursor: 'pointer', fontSize: '8px' }}
          >
            {k.substring(0,4)}
          </button>
        ))}
        <button onClick={() => {setAccessLevel('guest'); setPasskey('');}} style={{ marginTop: 'auto', color: '#444', background: 'none', border: 'none', cursor: 'pointer' }}>LOGOUT</button>
      </nav>

      {/* CLOUD VAULT PANEL */}
      <aside style={{ width: '340px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '25px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <h2 style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '3px' }}>{accessLevel.toUpperCase()} CLOUD VAULT</h2>
        
        <label style={{ margin: '20px 0', border: '1px dashed #D4AF37', padding: '15px', color: '#D4AF37', fontSize: '11px', textAlign: 'center', cursor: 'pointer', display: 'block' }}>
          {isSyncing ? "UPLOADING TO SUPABASE..." : "↑ SYNC NEW ASSETS"}
          <input type="file" multiple onChange={syncToCloud} style={{ display: 'none' }} />
        </label>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {vaultFiles.map(file => (
            <div 
              key={file.id} 
              onClick={() => setActiveFile(file)} 
              style={{ padding: '12px', background: '#000', marginBottom: '8px', fontSize: '11px', border: activeFile?.id === file.id ? '1px solid #D4AF37' : '1px solid #222', cursor: 'pointer', position: 'relative' }}
            >
              <span style={{ color: '#00ff00', marginRight: '8px' }}>●</span>
              {file.name}
            </div>
          ))}
        </div>

        <textarea 
          value={stickyNote} 
          onChange={(e)=>setStickyNote(e.target.value)} 
          placeholder="Persistent Project Notes..." 
          style={{ width: '100%', height: '100px', background: '#000', color: '#f5e27a', border: '1px solid #333', padding: '10px', fontSize: '12px', marginTop: '20px', outline: 'none' }} 
        />
      </aside>

      {/* MAIN VIEWPORT */}
      <main style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '55%', background: '#000', borderBottom: '2px solid #D4AF37' }}>
          {activeFile && activeFile.type === 'website' ? (
            <iframe src={activeFile.url} style={{ width: '100%', height: '100%', border: 'none', background: 'white' }} />
          ) : activeFile && activeFile.type === 'image' ? (
            <div style={{ width: '100%', height: '100%', backgroundImage: `url(${activeFile.url})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
          ) : activeFile && activeFile.type === 'video' ? (
            <video src={activeFile.url} controls autoPlay loop style={{ width: '100%', height: '100%' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#222', fontSize: '1.5rem', letterSpacing: '15px' }}>
              DREAMTEAM 4K PORTAL
            </div>
          )}
        </div>

        <div style={{ height: '45%', background: '#800000', padding: '60px', position: 'relative' }}>
          <h1 style={{ color: '#D4AF37', fontSize: '3.5rem', margin: 0 }}>{accessLevel.toUpperCase()}</h1>
          <p style={{ color: 'white', opacity: 0.8, maxWidth: '800px', lineHeight: '1.6', fontSize: '1.1rem' }}>
            Infrastructure Verified. All assets displayed here are securely hosted in the Conglomerate Vault.
            You may now safely remove local copies to optimize hardware space.
          </p>
          <div style={{ position: 'absolute', bottom: 30, left: 60 }}>
            <p style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '2px' }}>SYSTEM AUDIT</p>
            {auditLog.map((log, i) => <p key={i} style={{ fontSize: '10px', color: '#666', margin: '2px 0' }}>[{log.time}] {log.msg}</p>)}
          </div>
        </div>

        {/* ANTI-BLEED MODAL FOR DOCUMENTS */}
        {activeFile && activeFile.type !== 'website' && activeFile.type !== 'image' && activeFile.type !== 'video' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.98)', zIndex: 100, display: 'flex', justifyContent: 'center', padding: '40px', overflowY: 'auto' }}>
            <div style={{ width: '794px', minHeight: '1123px', height: 'fit-content', background: 'white', color: 'black', padding: '80px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '10px' }}>
                <button onClick={() => deleteAsset(activeFile.id, activeFile.url)} style={{ background: 'black', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>ERASE FROM CLOUD</button>
                <button onClick={() => setActiveFile(null)} style={{ background: '#800000', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>CLOSE</button>
              </div>
              <h2 style={{ color: '#800000', borderBottom: '2px solid #800000', paddingBottom: '10px' }}>{activeFile.name}</h2>
              <div style={{ marginTop: '40px' }}>
                 <iframe src={activeFile.url} style={{ width: '100%', height: '800px', border: 'none' }} />
              </div>
              <div style={{ marginTop: '50px', borderTop: '2px solid #000', paddingTop: '20px', fontWeight: 'bold' }}>TERMINATED AT THIS BOUNDARY. VALIDATED BY HQ.</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

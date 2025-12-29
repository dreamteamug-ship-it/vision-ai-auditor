"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function GlobalConglomerateMaster() {
  // --- CORE STATE ---
  const [accessLevel, setAccessLevel] = useState<'guest' | string>('guest');
  const [passkey, setPasskey] = useState('');
  const [activeFile, setActiveFile] = useState<any>(null);
  const [vaultFiles, setVaultFiles] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  
  // --- ASHANTI AI STATE ---
  const [isAshantiOpen, setIsAshantiOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Greetings. I am Ashanti. The Ecosystem is online. I have prepared the House environments for your arrival.' }
  ]);
  const [userInput, setUserInput] = useState('');

  // --- LUXURY HOUSE REGISTRY (THEMES & IDENTITY) ---
  const HOUSES: any = {
    'ADMIN99': { name: 'CENTRAL COMMAND HQ', color: '#000000', accent: '#D4AF37', secondary: '#C0C0C0' },
    'BALAJI': { name: 'BALAJI HYGIENE PRODUCTS', color: '#300101', accent: '#D4AF37', secondary: '#F5E8C7' },
    'SINOEV': { name: 'SINOAFRIQ EV MOBILITY', color: '#000814', accent: '#E5E4E2', secondary: '#003566' },
    'ALTOGLOBAL': { name: 'ALTOVEX GLOBAL LOGISTICS', color: '#0A0A0A', accent: '#C0C0C0', secondary: '#333333' },
    'URBANEDGE': { name: 'URBAN EDGE SOLUTIONS', color: '#021206', accent: '#D4AF37', secondary: '#2D6A4F' },
    'BATTSWAP': { name: 'AFRISINO BATTERY SWAP', color: '#121212', accent: '#FFD700', secondary: '#DAA520' }
  };

  const COMPANY_KEYS: any = {
    'ADMIN99': 'admin', 
    'BALAJI': 'balaji', 
    'SINOEV': 'sinoev',
    'ALTOGLOBAL': 'altoglobal', 
    'URBANEDGE': 'urbanedge', 
    'BATTSWAP': 'battswap'
  };

  // Determine current active theme
  const currentHouseKey = Object.keys(COMPANY_KEYS).find(key => COMPANY_KEYS[key] === accessLevel) || 'ADMIN99';
  const theme = HOUSES[currentHouseKey] || HOUSES['ADMIN99'];

  // --- DATABASE OPERATIONS ---
  const fetchVault = async (key: string) => {
    const target = key === 'admin' ? 'dtconsult' : key;
    const { data } = await supabase.from('assets').select('*').eq('company_key', target).order('created_at', { ascending: false });
    if (data) setVaultFiles(data);
  };

  const handleGlobalSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) { fetchVault(accessLevel); return; }
    let base = supabase.from('assets').select('*').ilike('name', `%${query}%`);
    if (accessLevel !== 'admin') base = base.eq('company_key', accessLevel);
    const { data } = await base;
    if (data) setVaultFiles(data);
  };

  const syncToCloud = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || accessLevel === 'guest') return;
    setIsSyncing(true);
    const targetKey = accessLevel === 'admin' ? 'dtconsult' : accessLevel;
    for (const file of Array.from(files)) {
      const filePath = `${targetKey}/${Date.now()}_${file.name}`;
      const { data: storageData } = await supabase.storage.from('conglomerate-vault').upload(filePath, file);
      if (storageData) {
        const { data: { publicUrl } } = supabase.storage.from('conglomerate-vault').getPublicUrl(filePath);
        await supabase.from('assets').insert([{
          name: file.name, url: publicUrl, company_key: targetKey,
          type: file.type.includes('html') ? 'website' : file.type.split('/')[0]
        }]);
      }
    }
    fetchVault(targetKey);
    setIsSyncing(false);
  };

  useEffect(() => { if (accessLevel !== 'guest') fetchVault(accessLevel); }, [accessLevel]);

  // --- LOGIN UI ---
  if (accessLevel === 'guest') {
    return (
      <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '70px', border: '1px solid #D4AF37', background: 'radial-gradient(circle, #1a0000 0%, #000 100%)', textAlign: 'center', boxShadow: '0 0 80px rgba(212,175,55,0.15)' }}>
          <h1 style={{ color: '#D4AF37', letterSpacing: '15px', fontSize: '1.2rem', marginBottom: '40px' }}>DREAMTEAM GLOBAL</h1>
          <input type="password" placeholder="ENTER ACCESS IDENTIFIER" value={passkey} onChange={(e)=>setPasskey(e.target.value.toUpperCase())} style={{ background: 'transparent', borderBottom: '1px solid #D4AF37', borderTop:'none', borderLeft:'none', borderRight:'none', color: 'white', padding: '15px', width: '320px', textAlign: 'center', outline: 'none', letterSpacing: '4px' }} />
          <button onClick={() => COMPANY_KEYS[passkey] ? setAccessLevel(COMPANY_KEYS[passkey]) : alert("INVALID KEY")} style={{ display: 'block', margin: '50px auto 0', background: '#D4AF37', color: 'black', padding: '15px 70px', fontWeight: '800', cursor: 'pointer', border: 'none', letterSpacing: '3px' }}>AUTHENTICATE</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: theme.color, transition: 'background 1.2s cubic-bezier(0.4, 0, 0.2, 1)', color: 'white', overflow: 'hidden' }}>
      
      {/* 1. FLOATING NAVIGATION BAR */}
      <nav style={{ width: '85px', background: 'rgba(0,0,0,0.9)', borderRight: `1px solid ${theme.accent}44`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', gap: '25px', zIndex: 1000 }}>
        <div style={{ color: theme.accent, fontWeight: '900', fontSize: '1.4rem', marginBottom: '30px', textShadow: `0 0 10px ${theme.accent}66` }}>DT</div>
        {Object.keys(COMPANY_KEYS).map(key => (
          <div key={key} style={{ position: 'relative' }} onMouseEnter={() => setHoveredKey(key)} onMouseLeave={() => setHoveredKey(null)}>
            <button 
              onClick={() => {setAccessLevel(COMPANY_KEYS[key]); setActiveFile(null);}} 
              style={{ width: '52px', height: '52px', background: accessLevel === COMPANY_KEYS[key] ? theme.accent : 'transparent', color: accessLevel === COMPANY_KEYS[key] ? 'black' : theme.accent, border: `1px solid ${theme.accent}`, borderRadius: '2px', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold', transition: '0.4s' }}
            >
              {key.substring(0,4)}
            </button>
            {hoveredKey === key && (
              <div style={{ position: 'absolute', left: '75px', top: '50%', transform: 'translateY(-50%)', background: theme.accent, color: 'black', padding: '10px 20px', fontSize: '11px', fontWeight: '900', whiteSpace: 'nowrap', boxShadow: '15px 0 30px rgba(0,0,0,0.6)', zIndex: 1100, letterSpacing: '2px' }}>
                <div style={{ position: 'absolute', left: '-6px', top: '50%', transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderRight: `6px solid ${theme.accent}` }}></div>
                {HOUSES[key].name}
              </div>
            )}
          </div>
        ))}
        <button onClick={() => setAccessLevel('guest')} style={{ marginTop: 'auto', color: '#444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', letterSpacing: '2px' }}>LOGOUT</button>
      </nav>

      {/* 2. DYNAMIC ASSET ASIDE */}
      <aside style={{ width: '400px', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(15px)', borderRight: `1px solid ${theme.accent}22`, padding: '40px', display: 'flex', flexDirection: 'column' }}>
        <input type="text" placeholder="GLOBAL ECOSYSTEM SEARCH..." value={searchQuery} onChange={(e) => handleGlobalSearch(e.target.value)} style={{ width: '100%', background: 'transparent', border: `1px solid ${theme.accent}44`, color: 'white', padding: '18px', marginBottom: '40px', fontSize: '11px', outline: 'none', letterSpacing: '2px' }} />
        
        <div style={{ borderBottom: `1px solid ${theme.accent}22`, paddingBottom: '15px', marginBottom: '25px' }}>
            <h2 style={{ color: theme.accent, letterSpacing: '5px', fontSize: '0.9rem', margin: 0 }}>{theme.name}</h2>
            <p style={{ color: theme.secondary, fontSize: '0.6rem', letterSpacing: '3px', marginTop: '5px' }}>OFFICIAL CLOUD VAULT</p>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {vaultFiles.map(file => (
            <div key={file.id} onClick={() => setActiveFile(file)} style={{ padding: '20px', background: activeFile?.id === file.id ? `${theme.accent}11` : 'transparent', marginBottom: '8px', borderLeft: activeFile?.id === file.id ? `3px solid ${theme.accent}` : '3px solid transparent', cursor: 'pointer', transition: '0.3s' }}>
              <p style={{ fontSize: '11px', color: activeFile?.id === file.id ? theme.accent : '#888', margin: 0, letterSpacing: '1px' }}>{file.name.toUpperCase()}</p>
            </div>
          ))}
        </div>

        <label style={{ marginTop: '30px', padding: '20px', textAlign: 'center', border: `1px dashed ${theme.accent}66`, color: theme.accent, cursor: 'pointer', fontSize: '11px', letterSpacing: '3px', transition: '0.3s' }}>
          {isSyncing ? "SYNCING TO CLOUD..." : "+ VAULT NEW ASSET"}
          <input type="file" multiple onChange={syncToCloud} style={{ display: 'none' }} />
        </label>
      </aside>

      {/* 3. THE 4K VIEWPORT STAGE */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ height: '65%', background: '#000', borderBottom: `1px solid ${theme.accent}33` }}>
          {activeFile ? (
            <iframe src={activeFile.url} style={{ width: '100%', height: '100%', border: 'none', background: 'white' }} />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `radial-gradient(circle at center, ${theme.color} 0%, #000 100%)` }}>
              <div style={{ textAlign: 'center', opacity: 0.1 }}>
                <h3 style={{ color: theme.accent, fontSize: '5rem', letterSpacing: '40px', margin: 0 }}>DREAMTEAM</h3>
                <p style={{ color: theme.accent, fontSize: '1rem', letterSpacing: '15px', marginTop: '20px' }}>ESTABLISHED 2024</p>
              </div>
            </div>
          )}
        </div>

        {/* EMBOSSED PLATINUM/GOLD FOOTER */}
        <div style={{ flex: 1, padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)` }}>
           <h1 style={{ 
             fontSize: '6rem', 
             margin: 0, 
             color: 'transparent', 
             WebkitTextStroke: `1px ${theme.accent}88`,
             letterSpacing: '-3px',
             fontWeight: '900'
           }}>
             {accessLevel.toUpperCase()}
           </h1>
           <div style={{ display: 'flex', gap: '30px', alignItems: 'center', marginTop: '-10px' }}>
              <div style={{ height: '1px', width: '100px', background: theme.accent }}></div>
              <p style={{ color: theme.accent, letterSpacing: '12px', fontSize: '0.9rem', fontWeight: '300' }}>INFRASTRUCTURE VERIFIED</p>
           </div>
        </div>

        {/* ASHANTI AI SYSTEM PANEL */}
        <div style={{ position: 'absolute', bottom: '50px', right: '50px', zIndex: 2000 }}>
          {isAshantiOpen ? (
            <div style={{ width: '420px', height: '650px', background: 'rgba(0,0,0,0.95)', border: `1px solid ${theme.accent}`, display: 'flex', flexDirection: 'column', boxShadow: `0 0 60px ${theme.accent}22`, backdropFilter: 'blur(20px)' }}>
              <div style={{ background: theme.accent, color: 'black', padding: '25px', fontWeight: '900', display: 'flex', justifyContent: 'space-between', letterSpacing: '3px', fontSize: '12px' }}>
                ASHANTI ASSISTANT // {currentHouseKey}
                <button onClick={()=>setIsAshantiOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: '900' }}>[ X ]</button>
              </div>
              <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
                <p style={{ color: theme.accent, fontSize: '14px', lineHeight: '1.8', borderLeft: `2px solid ${theme.accent}`, paddingLeft: '20px' }}>
                  Ashanti: I have shifted the architecture to the {theme.name} profile. All protocols are active. How shall we govern the assets today?
                </p>
              </div>
              <div style={{ padding: '30px', borderTop: `1px solid ${theme.accent}22` }}>
                <input placeholder="ENTER COMMAND..." style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${theme.accent}44`, color: 'white', padding: '15px', outline: 'none', letterSpacing: '2px', fontSize: '11px' }} />
              </div>
            </div>
          ) : (
            <button onClick={()=>setIsAshantiOpen(true)} style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#000', border: `2px solid ${theme.accent}`, color: theme.accent, fontSize: '28px', fontWeight: '900', cursor: 'pointer', boxShadow: `0 0 30px ${theme.accent}44`, transition: '0.3s' }}>A</button>
          )}
        </div>
      </main>
    </div>
  );
}

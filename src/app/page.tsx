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
  
  // --- ASHANTI AI STATE ---
  const [isAshantiOpen, setIsAshantiOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([{ role: 'ai', text: 'Greetings. I am Ashanti. I am here to guide you through the DreamTeam Ecosystem. How may I assist your operations today?' }]);
  const [userInput, setUserInput] = useState('');

  const COMPANY_KEYS: any = {
    'ADMIN99': 'admin', 'ALTOGLOBAL': 'altoglobal', 'ALTOUG': 'altoug',
    'DIGIDEN': 'digiden', 'DTCONSULT': 'dtconsult', 'DTEQ360': 'dteq360',
    'URBANEDGE': 'urbanedge', 'DLINE': 'dline', 'SINOEV': 'sinoev',
    'PARK360': 'park360', 'BATTSWAP': 'battswap'
  };

  // --- SEARCH ENGINE ---
  const handleGlobalSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) { fetchVault(accessLevel); return; }
    let base = supabase.from('assets').select('*').ilike('name', `%${query}%`);
    if (accessLevel !== 'admin') base = base.eq('company_key', accessLevel);
    const { data } = await base;
    if (data) setVaultFiles(data);
  };

  const fetchVault = async (key: string) => {
    const target = key === 'admin' ? 'dtconsult' : key;
    const { data } = await supabase.from('assets').select('*').eq('company_key', target).order('created_at', { ascending: false });
    if (data) setVaultFiles(data);
  };

  // --- ASHANTI CHAT LOGIC ---
  const sendMessage = () => {
    if (!userInput) return;
    const newHistory = [...chatHistory, { role: 'user', text: userInput }];
    setChatHistory(newHistory);
    setUserInput('');
    // Simulated AI Response - In a real app, connect this to an LLM API
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', text: `Ashanti Analysis: Based on your request for "${userInput}", I recommend checking the ${accessLevel.toUpperCase()} vault for recent updates or using the Global Search bar.` }]);
    }, 600);
  };

  useEffect(() => { if (accessLevel !== 'guest') fetchVault(accessLevel); }, [accessLevel]);

  if (accessLevel === 'guest') {
    return (
      <div style={{ height: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '60px', border: '1px solid #D4AF37', background: '#1a0000', textAlign: 'center' }}>
          <h1 style={{ color: '#D4AF37', letterSpacing: '8px' }}>CONGLOMERATE HQ</h1>
          <input type="password" placeholder="ACCESS KEY" value={passkey} onChange={(e)=>setPasskey(e.target.value.toUpperCase())} style={{ background: 'transparent', border: '1px solid #D4AF37', color: 'white', padding: '15px', width: '300px', textAlign: 'center', marginTop: '20px' }} />
          <button onClick={() => COMPANY_KEYS[passkey] ? setAccessLevel(COMPANY_KEYS[passkey]) : alert("INVALID")} style={{ display: 'block', margin: '30px auto 0', background: '#D4AF37', color: 'black', padding: '12px 50px', fontWeight: 'bold' }}>AUTHENTICATE</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#050505', color: 'white', overflow: 'hidden' }}>
      
      {/* 1. LEFT NAV */}
      <nav style={{ width: '70px', background: '#000', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: '15px' }}>
        <div style={{ color: '#D4AF37', fontWeight: 'bold' }}>HQ</div>
        {accessLevel === 'admin' && Object.keys(COMPANY_KEYS).filter(k=>k!=='ADMIN99').map(k => (
          <button key={k} onClick={() => setAccessLevel(COMPANY_KEYS[k])} style={{ width: '40px', height: '40px', background: accessLevel === COMPANY_KEYS[k] ? '#800000' : '#111', color: '#D4AF37', border: 'none', borderRadius: '5px', fontSize: '8px' }}>{k.substring(0,4)}</button>
        ))}
        <button onClick={() => setAccessLevel('guest')} style={{ marginTop: 'auto', color: '#444', background: 'none', border: 'none' }}>OFF</button>
      </nav>

      {/* 2. VAULT PANEL + SEARCH */}
      <aside style={{ width: '340px', background: '#1a0000', borderRight: '1px solid #D4AF37', padding: '25px', display: 'flex', flexDirection: 'column' }}>
        <input type="text" placeholder="SEARCH ECOSYSTEM..." value={searchQuery} onChange={(e) => handleGlobalSearch(e.target.value)} style={{ width: '100%', background: '#000', border: '1px solid #D4AF37', color: '#D4AF37', padding: '12px', marginBottom: '20px', fontSize: '10px' }} />
        
        <h2 style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '3px' }}>{accessLevel.toUpperCase()} VAULT</h2>
        <div style={{ flex: 1, overflowY: 'auto', marginTop: '15px' }}>
          {vaultFiles.map(file => (
            <div key={file.id} onClick={() => setActiveFile(file)} style={{ padding: '12px', background: '#000', marginBottom: '8px', fontSize: '11px', border: '1px solid #222', cursor: 'pointer' }}>
              <span style={{ color: '#00ff00', marginRight: '8px' }}>●</span> {file.name}
            </div>
          ))}
        </div>
      </aside>

      {/* 3. WORKSTAGE */}
      <main style={{ flex: 1, position: 'relative' }}>
        <div style={{ height: '55%', background: '#000', borderBottom: '2px solid #D4AF37' }}>
          {activeFile ? (
            <iframe src={activeFile.url} style={{ width: '100%', height: '100%', border: 'none', background: 'white' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#222', letterSpacing: '10px' }}>DREAMTEAM 4K VIEWPORT</div>
          )}
        </div>
        <div style={{ height: '45%', background: '#800000', padding: '50px' }}>
          <h1 style={{ color: '#D4AF37', fontSize: '3rem', margin: 0 }}>{accessLevel.toUpperCase()}</h1>
          <p style={{ color: 'white', opacity: 0.7 }}>Infrastructure synced to Supabase Cloud.</p>
        </div>

        {/* ASHANTI AI TOGGLE & CHAT */}
        <div style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 1000 }}>
          {isAshantiOpen ? (
            <div style={{ width: '350px', height: '500px', background: '#000', border: '2px solid #D4AF37', display: 'flex', flexDirection: 'column', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
              <div style={{ background: '#D4AF37', color: 'black', padding: '15px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                ASHANTI AI ASSISTANT
                <button onClick={() => setIsAshantiOpen(false)} style={{ background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>X</button>
              </div>
              <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {chatHistory.map((m, i) => (
                  <div key={i} style={{ alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end', background: m.role === 'ai' ? '#1a0000' : '#D4AF37', color: m.role === 'ai' ? '#D4AF37' : 'black', padding: '10px', borderRadius: '5px', fontSize: '12px', maxWidth: '80% shadow: 0 2px 5px black' }}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div style={{ padding: '15px', borderTop: '1px solid #333', display: 'flex' }}>
                <input value={userInput} onChange={(e)=>setUserInput(e.target.value)} onKeyPress={(e)=>e.key==='Enter' && sendMessage()} placeholder="Ask Ashanti..." style={{ flex: 1, background: '#111', border: '1px solid #333', color: 'white', padding: '10px' }} />
                <button onClick={sendMessage} style={{ background: '#D4AF37', border: 'none', padding: '0 15px' }}>→</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setIsAshantiOpen(true)} style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#D4AF37', color: 'black', fontWeight: 'bold', fontSize: '20px', border: '4px solid #800000', cursor: 'pointer', boxShadow: '0 0 20px #D4AF37' }}>A</button>
          )}
        </div>
      </main>
    </div>
  );
}

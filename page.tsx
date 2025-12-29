"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Page() {
  const [results, setResults] = useState<any[]>([]);
  const [isWorking, setIsWorking] = useState(false);

  // Added 'any' type to 'e' to stop Vercel build errors
  async function uploadFiles(e: any) {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    setIsWorking(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    try {
      // 1. Get AI Analysis from your Local Python Brain
      const resp = await fetch('http://localhost:5000/analyze', { 
        method: 'POST', 
        body: formData 
      });
      
      const data = await resp.json();
      const auditRows = data.results || [];
      setResults(auditRows);

      // 2. LIVE SYNC: Save results to Supabase "audits" table
      const { error } = await supabase
        .from('audits')
        .insert(auditRows.map((row: any) => ({
          filename: row.filename,
          status: row.status,
          match_rate: parseInt(row.match.replace('%', '')) || 0
        })));

      if (error) console.error("Supabase Error:", error.message);

    } catch (err) {
      console.error(err);
      alert("Note: Ensure your Python Bridge (vision_bridge.py) is running locally.");
    } finally {
      setIsWorking(false);
    }
  }

  const handlePrint = () => { window.print(); };

  return (
    <div style={{ minHeight: '100vh', background: '#E5E4E2', fontFamily: 'Georgia, serif' }}>
      <nav className="no-print" style={{ background: '#800000', padding: '1.5rem 3rem', color: '#D4AF37', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #D4AF37' }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>VisionAI <span style={{ color: '#E5E4E2' }}>Auditor</span></div>
        <button onClick={handlePrint} style={{ background: '#D4AF37', color: '#800000', border: 'none', padding: '10px 25px', fontWeight: 'bold', cursor: 'pointer' }}>GENERATE CERTIFIED REPORT</button>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 30px' }}>
        <div className="no-print" style={{ background: 'white', padding: '30px', border: '1px solid #C0C0C0', boxShadow: '8px 8px 0px #800000', marginBottom: '40px' }}>
          <h2 style={{ color: '#800000', margin: 0 }}>Executive Audit Terminal</h2>
          <input type="file" multiple onChange={uploadFiles} style={{ marginTop: '20px', width: '100%' }} />
          {isWorking && <p style={{ color: '#800000', fontWeight: 'bold', marginTop: '15px' }}>RECONCILING & SYNCING TO CLOUD...</p>}
        </div>

        {results.length > 0 && (
          <div style={{ background: 'white', border: '2px solid #800000', boxShadow: '8px 8px 0px #C0C0C0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#C0C0C0', color: '#800000' }}>
                  <th style={{ padding: '15px', textAlign: 'left', border: '1px solid #800000' }}>DOCUMENT REFERENCE</th>
                  <th style={{ padding: '15px', textAlign: 'left', border: '1px solid #800000' }}>AUDIT STATUS</th>
                  <th style={{ padding: '15px', textAlign: 'left', border: '1px solid #800000' }}>CONFIDENCE</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #C0C0C0' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{row.filename}</td>
                    <td style={{ padding: '12px', color: row.status.includes('✅') ? '#166534' : '#800000', fontWeight: 'bold' }}>{row.status}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{row.match}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <style>{`@media print { .no-print { display: none !important; } body { background: white !important; } }`}</style>
    </div>
  );
}
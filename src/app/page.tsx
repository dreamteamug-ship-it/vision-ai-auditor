"use client";
import React, { useState } from 'react';

export default function Page() {
  const [results, setResults] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  async function uploadFiles(e) {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    setIsWorking(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }
    try {
      const resp = await fetch('http://localhost:5000/analyze', { method: 'POST', body: formData });
      const data = await resp.json();
      setResults(data.results || []);
    } catch (err) {
      alert("ERP System offline.");
    } finally {
      setIsWorking(false);
    }
  }

  const handlePrint = () => { window.print(); };

  const totalFiles = results.length;
  const avgMatch = totalFiles > 0 
    ? Math.round(results.reduce((acc, curr) => acc + parseInt(curr.match), 0) / totalFiles) 
    : 0;
  const reviewCount = results.filter(r => r.status.includes('REVIEW')).length;

  return (
    <div style={{ minHeight: '100vh', background: '#E5E4E2', fontFamily: 'Georgia, serif', color: '#333' }}>
      
      {/* Executive Navigation */}
      <nav className="no-print" style={{ 
        background: '#800000', padding: '1.5rem 3rem', color: '#D4AF37', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '4px solid #D4AF37', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
      }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', letterSpacing: '2px' }}>
          VisionAI <span style={{ color: '#E5E4E2' }}>Auditor</span>
        </div>
        <button onClick={handlePrint} style={{ 
          background: '#D4AF37', color: '#800000', border: 'none', padding: '10px 25px', 
          fontWeight: 'bold', cursor: 'pointer', borderRadius: '2px', boxShadow: '2px 2px 0px #000'
        }}>
          GENERATE CERTIFIED REPORT
        </button>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 30px' }}>
        
        {/* Print Header */}
        <div className="print-only" style={{ display: 'none', textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#800000', marginBottom: '5px' }}>CERTIFIED AUDIT LEDGER</h1>
          <p style={{ margin: 0, fontWeight: 'bold' }}>RAW MATERIAL ALLOCATION & BUDGET RECONCILIATION</p>
          <hr style={{ border: '1px solid #D4AF37', marginTop: '20px' }} />
        </div>

        {/* Input Console */}
        <div className="no-print" style={{ background: 'white', padding: '30px', border: '1px solid #C0C0C0', boxShadow: '8px 8px 0px #800000', marginBottom: '40px' }}>
          <h2 style={{ color: '#800000', margin: 0 }}>Allocation Input Terminal</h2>
          <input type="file" multiple onChange={uploadFiles} style={{ marginTop: '20px', fontWeight: 'bold' }} />
          {isWorking && <p style={{ color: '#800000', fontWeight: 'bold' }}>RECONCILING LEDGER...</p>}
        </div>

        {results.length > 0 && (
          <>
            <div style={{ background: 'white', border: '2px solid #800000', boxShadow: '8px 8px 0px #C0C0C0', marginBottom: '20px' }}>
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
                      <td style={{ padding: '12px', fontWeight: 'bold', borderRight: '1px solid #C0C0C0' }}>{row.filename}</td>
                      <td style={{ padding: '12px', borderRight: '1px solid #C0C0C0', color: row.status.includes('✅') ? '#166534' : '#800000', fontWeight: 'bold' }}>{row.status}</td>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{row.match}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Executive Summary */}
            <div style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', 
              background: '#800000', color: '#D4AF37', padding: '20px', border: '2px solid #D4AF37' 
            }}>
              <div style={{ textAlign: 'center' }}>TOTAL DOCUMENTS: {totalFiles}</div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid #D4AF37', borderRight: '1px solid #D4AF37' }}>AVG ACCURACY: {avgMatch}%</div>
              <div style={{ textAlign: 'center' }}>REVIEWS REQUIRED: {reviewCount}</div>
            </div>

            {/* Signature Section */}
            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ borderTop: '2px solid #333', width: '250px', textAlign: 'center', paddingTop: '10px' }}>
                <p style={{ fontSize: '0.8rem', margin: 0 }}>Chief Auditor Signature</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.8rem', margin: 0, fontStyle: 'italic' }}>System Authenticated: {new Date().toLocaleString()}</p>
                <p style={{ fontSize: '0.8rem', margin: 0, fontWeight: 'bold', color: '#800000' }}>VERIFIED BY VISIONAI BATCH PROCESSOR</p>
              </div>
            </div>
          </>
        )}
      </main>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          main { margin: 0 !important; max-width: 100% !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}
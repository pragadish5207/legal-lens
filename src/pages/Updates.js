import React from 'react';
import { PATCH_UPDATES } from '../patchData';

const Updates = () => {
  // We define a dedicated "Clean Dark" theme just for this page
  const updateTheme = {
    bg: "#121212",
    accent: "#007bff", // Professional Blue
    text: "#e0e0e0",
    subtext: "#888"
  };

  return (
    <div style={{ 
      padding: '60px 20px', 
      maxWidth: '900px', 
      margin: '0 auto',
      backgroundColor: updateTheme.bg, 
      minHeight: '100vh',
      textAlign: 'left'
    }}>
      <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '15px', fontWeight: '800' }}>
        Product Roadmap
      </h1>
      <p style={{ color: updateTheme.subtext, fontSize: '1.1rem', marginBottom: '60px' }}>
        Documenting the journey of Legal-Lens Pro: From a student project to an AI-powered legal dashboard.
      </p>

      <div style={{ position: 'relative', borderLeft: `2px solid #333`, paddingLeft: '40px', marginLeft: '20px' }}>
        {PATCH_UPDATES.map((patch, index) => (
          <div key={index} style={{ marginBottom: '80px', position: 'relative' }}>
            
            {/* The Timeline Dot - Now a soft blue glow */}
            <div style={{
              position: 'absolute', left: '-51px', top: '5px',
              width: '18px', height: '18px', borderRadius: '50%',
              backgroundColor: updateTheme.bg, 
              border: `3px solid ${updateTheme.accent}`,
              boxShadow: `0 0 10px ${updateTheme.accent}44` // Subtle glow
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <span style={{ 
                background: patch.status === 'LATEST' ? updateTheme.accent : '#252525',
                color: '#fff',
                padding: '5px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: '800',
                letterSpacing: '1px'
              }}>
                {patch.version}
              </span>
              <span style={{ color: updateTheme.subtext, fontSize: '14px', fontWeight: '500' }}>{patch.date}</span>
            </div>

            <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '10px' }}>{patch.title}</h2>
            <p style={{ color: updateTheme.subtext, fontStyle: 'italic', marginBottom: '20px', fontSize: '15px' }}>
              {patch.description}
            </p>
            
            <ul style={{ color: updateTheme.text, lineHeight: '2', listStyleType: 'none', padding: 0 }}>
              {patch.features.map((feat, i) => (
                <li key={i} style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: updateTheme.accent }}>🚀</span> {feat}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;
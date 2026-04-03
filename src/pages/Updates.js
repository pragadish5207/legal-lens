import React from 'react';
import { Helmet } from 'react-helmet';
import { PATCH_UPDATES } from '../patchData';

const Updates = () => {
  const updateTheme = {
    bg: "transparent", // Set to transparent to match your global background
    accent: "#007bff", 
    text: "#e0e0e0",
    subtext: "#888"
  };

  return (
    <div style={{ padding: '100px 20px', maxWidth: '900px', margin: '0 auto', minHeight: '100vh' }}>
      <Helmet>
        <title>Product Roadmap | Legal-Lens Pro AI Evolution</title>
        <meta name="description" content="Follow the development journey of Legal-Lens Pro. From a student project to a Pan-India AI Legal Aid platform." />
      </Helmet>

      <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '15px', fontWeight: '900', textAlign: 'center' }}>
        Product Roadmap
      </h1>
      <p style={{ color: updateTheme.subtext, fontSize: '1.1rem', marginBottom: '80px', textAlign: 'center', maxWidth: '700px', margin: '0 auto 80px auto' }}>
        Documenting the evolution of Legal-Lens Pro: A transparent record of our journey toward democratizing Indian law.
      </p>

      <div style={{ position: 'relative', borderLeft: `2px solid #222`, paddingLeft: '40px', marginLeft: '20px' }}>
        {PATCH_UPDATES.map((patch, index) => (
          <div key={index} style={{ marginBottom: '80px', position: 'relative' }}>
            
            {/* The Timeline Dot */}
            <div style={{
              position: 'absolute', left: '-51px', top: '5px',
              width: '20px', height: '20px', borderRadius: '50%',
              backgroundColor: '#000', 
              border: `4px solid ${patch.status === 'LATEST' ? updateTheme.accent : '#333'}`,
              boxShadow: patch.status === 'LATEST' ? `0 0 15px ${updateTheme.accent}66` : 'none',
              zIndex: 2
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <span style={{ 
                background: patch.status === 'LATEST' ? updateTheme.accent : '#1a1a1a',
                color: patch.status === 'LATEST' ? '#fff' : '#666',
                padding: '6px 16px', borderRadius: '30px', fontSize: '12px', fontWeight: '800',
                letterSpacing: '1.5px', border: patch.status === 'LATEST' ? 'none' : '1px solid #333'
              }}>
                {patch.version}
              </span>
              <span style={{ color: updateTheme.subtext, fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>
                {patch.date}
              </span>
            </div>

            <h2 style={{ color: '#fff', fontSize: '28px', marginBottom: '12px', fontWeight: '700' }}>{patch.title}</h2>
            <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '25px', fontSize: '1.05rem', lineHeight: '1.6' }}>
              {patch.description}
            </p>
            
            <ul style={{ color: updateTheme.text, lineHeight: '2.2', listStyleType: 'none', padding: 0 }}>
              {patch.features.map((feat, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: updateTheme.accent, fontSize: '1.2rem' }}>•</span> 
                  <span style={{ color: '#bbb' }}>{feat}</span>
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
import React, { useState } from 'react';
import districtData from './districtData.json';

const LocalHelp = ({ cyberMode }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    const stateObj = districtData.states.find(s => s.state === stateName);
    setDistricts(stateObj ? stateObj.districts : []);
    setSelectedDistrict(''); 
  };

  const handleFindHelp = () => {
    if (!selectedState || !selectedDistrict) return;

    // The Magic Link: Searches Google Maps for Legal Services in that specific district
    const query = `District Legal Services Authority ${selectedDistrict} ${selectedState}`;
    const mapUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
    
    window.open(mapUrl, '_blank');
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: cyberMode ? '1px solid #00ffff' : '1px solid #ccc', 
      borderRadius: '10px', 
      marginTop: '20px', 
      backgroundColor: cyberMode ? '#000' : '#f9f9f9',
      color: cyberMode ? '#00ffff' : '#333'
    }}>
      <h3 style={{ color: cyberMode ? '#00ffff' : '#333' }}>⚖️ Find Legal Help Near You</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Select State: </label>
        <select 
          onChange={handleStateChange}
          value={selectedState}
          style={{ 
            marginLeft: '10px', 
            padding: '5px',
            backgroundColor: cyberMode ? '#111' : '#fff',
            color: cyberMode ? '#00ffff' : '#000',
            border: cyberMode ? '1px solid #00ffff' : '1px solid #ccc'
          }}
        >
          <option value="">-- Choose State --</option>
          {districtData.states.map((s, index) => (
            <option key={index} value={s.state}>{s.state}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Select District: </label>
        <select 
          disabled={!selectedState}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          value={selectedDistrict}
          style={{ 
            marginLeft: '10px', 
            padding: '5px',
            backgroundColor: cyberMode ? '#111' : '#fff',
            color: cyberMode ? '#00ffff' : '#000',
            border: cyberMode ? '1px solid #00ffff' : '1px solid #ccc'
          }}
        >
          <option value="">-- Choose District --</option>
          {districts.map((d, index) => (
            <option key={index} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <button 
        onClick={handleFindHelp}
        disabled={!selectedDistrict}
        style={{
            backgroundColor: selectedDistrict ? (cyberMode ? '#ff00ff' : '#007bff') : '#cccccc',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: selectedDistrict ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
        }}
      >
        Find Nearest Center 🚀
      </button>
    </div>
  );
};

export default LocalHelp;
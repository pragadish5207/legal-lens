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

  const filteredStates = districtData.states.filter(s => 
    s.state.toLowerCase().startsWith(selectedState.toLowerCase())
  );

  const filteredDistricts = districts.filter(d => 
    d.toLowerCase().startsWith(selectedDistrict.toLowerCase())
  );

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
      
      {/* Searchable State Input */}
      <div style={{ marginBottom: '10px' }}>
        <label>Search State: </label>
        <input 
          list="state-list"
          placeholder="Type state name..."
          onChange={handleStateChange}
          value={selectedState}
          style={{ 
            marginLeft: '10px', 
            padding: '8px',
            borderRadius: '5px',
            backgroundColor: cyberMode ? '#111' : '#fff',
            color: cyberMode ? '#00ffff' : '#000',
            border: cyberMode ? '1px solid #00ffff' : '1px solid #ccc',
            width: '200px'
          }}
        />
        <datalist id="state-list">
          {filteredStates.map((s, index) => (
            <option key={index} value={s.state} />
          ))}
        </datalist>
      </div>

      {/* Searchable District Input */}
      <div style={{ marginBottom: '15px' }}>
        <label>Search District: </label>
        <input 
          list="district-list"
          placeholder={selectedState ? "Type district..." : "Select state first"}
          disabled={!selectedState}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          value={selectedDistrict}
          style={{ 
            marginLeft: '10px', 
            padding: '8px',
            borderRadius: '5px',
            backgroundColor: cyberMode ? '#111' : '#fff',
            color: cyberMode ? '#00ffff' : '#000',
            border: cyberMode ? '1px solid #00ffff' : '1px solid #ccc',
            width: '200px'
          }}
        />
        <datalist id="district-list">
          {filteredDistricts.map((d, index) => (
            <option key={index} value={d} />
          ))}
        </datalist>
      </div>

      <button 
        onClick={handleFindHelp}
        disabled={!selectedDistrict}
        style={{
            backgroundColor: selectedDistrict ? (cyberMode ? '#ff00ff' : '#007bff') : '#cccccc',
            color: 'white',
            padding: '10px 25px',
            border: 'none',
            borderRadius: '5px',
            cursor: selectedDistrict ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
            boxShadow: cyberMode && selectedDistrict ? '0 0 10px #ff00ff' : 'none'
        }}
      >
        Find Nearest Center 🚀
      </button>

      <div style={{ marginTop: '15px', fontSize: '12px', opacity: 0.8 }}>
       📞 NALSA National Helpline: <a href="tel:15100" style={{ color: cyberMode ? '#00ffff' : '#007bff', fontWeight: 'bold', textDecoration: 'none', marginLeft: '5px' }}>15100</a>
      </div>
    </div>
  );
};

export default LocalHelp;
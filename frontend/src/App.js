import DemoApp from './demo/DemoApp';
import PortalApp from './portal/PortalApp';
import { useState, useEffect } from 'react';
import './App.css';
import AdminApp from './admin/AdminApp';

const API_KEY = 'my-secret-key-12345';
const BASE_URL = 'http://localhost:3000/v1';

function VillageExplorer() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubdistrict, setSelectedSubdistrict] = useState('');

  const headers = { 'x-api-key': API_KEY };

  useEffect(() => {
    fetch(`${BASE_URL}/states`, { headers })
      .then(res => res.json())
      .then(data => setStates(data.data || []));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`${BASE_URL}/districts?state_id=${selectedState}`, { headers })
        .then(res => res.json())
        .then(data => setDistricts(data.data || []));
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`${BASE_URL}/subdistricts?district_id=${selectedDistrict}`, { headers })
        .then(res => res.json())
        .then(data => setSubdistricts(data.data || []));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedSubdistrict) {
      fetch(`${BASE_URL}/villages?subdistrict_id=${selectedSubdistrict}`, { headers })
        .then(res => res.json())
        .then(data => setVillages(data.data || []));
    }
  }, [selectedSubdistrict]);

  return (
    <div className="app">
      <h1>🇮🇳 India Villages Explorer</h1>
      <div className="dropdown-container">
        <label>Select State</label>
        <select onChange={e => { setSelectedState(e.target.value); setDistricts([]); setSubdistricts([]); setVillages([]); }}>
          <option value="">-- Select State --</option>
          {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      {districts.length > 0 && (
        <div className="dropdown-container">
          <label>Select District</label>
          <select onChange={e => { setSelectedDistrict(e.target.value); setSubdistricts([]); setVillages([]); }}>
            <option value="">-- Select District --</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
      )}
      {subdistricts.length > 0 && (
        <div className="dropdown-container">
          <label>Select Subdistrict</label>
          <select onChange={e => setSelectedSubdistrict(e.target.value)}>
            <option value="">-- Select Subdistrict --</option>
            {subdistricts.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
      )}
      {villages.length > 0 && (
        <div className="villages-container">
          <h3>🏘️ Villages ({villages.length})</h3>
          <div className="villages-grid">
            {villages.map(v => <div key={v.id} className="village-item">{v.name}</div>)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('explorer');

  return (
    <div>
      {/* This blue div is your NAVBAR */}
      <div style={{ background: '#1a365d', padding: '12px 24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold', marginRight: '20px' }}>🇮🇳 VillageAPI</span>
        
        <button onClick={() => setView('explorer')}
          style={{ padding: '8px 16px', background: view === 'explorer' ? '#4299e1' : 'transparent', color: 'white', border: '1px solid #4299e1', borderRadius: '6px', cursor: 'pointer' }}>
          Village Explorer
        </button>
        
        <button onClick={() => setView('admin')}
          style={{ padding: '8px 16px', background: view === 'admin' ? '#4299e1' : 'transparent', color: 'white', border: '1px solid #4299e1', borderRadius: '6px', cursor: 'pointer' }}>
          Admin Panel
        </button>
        
        <button onClick={() => setView('portal')}
          style={{ padding: '8px 16px', background: view === 'portal' ? '#4299e1' : 'transparent', color: 'white', border: '1px solid #4299e1', borderRadius: '6px', cursor: 'pointer' }}>
          B2B Portal
        </button>

        {/* --- ADDED THE DEMO BUTTON HERE --- */}
        <button onClick={() => setView('demo')}
          style={{ padding: '8px 16px', background: view === 'demo' ? '#48bb78' : 'transparent', color: 'white', border: '1px solid #48bb78', borderRadius: '6px', cursor: 'pointer' }}>
          🎯 Demo
        </button>
      </div>

      {/* This section decides which "page" to show */}
      {view === 'explorer' ? <VillageExplorer /> : 
       view === 'admin' ? <AdminApp /> : 
       view === 'portal' ? <PortalApp /> : 
       <DemoApp />}
    </div>
  );
}
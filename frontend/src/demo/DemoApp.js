import React, { useState, useEffect, useRef } from 'react';

const API_KEY = 'my-secret-key-12345';
const BASE_URL = 'http://localhost:3000/v1';
const headers = { 'x-api-key': API_KEY };

export default function DemoApp() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [address, setAddress] = useState({ village: '', subdistrict: '', district: '', state: '', country: 'India' });
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return; }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/autocomplete?q=${query}`, { headers });
        const data = await res.json();
        setSuggestions(data.data || []);
        setShowSuggestions(true);
      } catch (e) { setSuggestions([]); }
      setLoading(false);
    }, 300);
  }, [query]);

  const selectVillage = (item) => {
    setAddress({
      village: item.hierarchy.village,
      subdistrict: item.hierarchy.subDistrict,
      district: item.hierarchy.district,
      state: item.hierarchy.state,
      country: 'India'
    });
    setQuery(item.label);
    setShowSuggestions(false);
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.email || !address.village) return alert('Please fill all required fields and select a village!');
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: '5rem' }}>✅</div>
      <h2 style={{ color: '#2d3748', marginTop: '16px' }}>Form Submitted Successfully!</h2>
      <p style={{ color: '#718096', marginTop: '8px' }}>Full Address: <strong>{address.village}, {address.subdistrict}, {address.district}, {address.state}, India</strong></p>
      <button onClick={() => { setSubmitted(false); setForm({ fullName: '', email: '', phone: '', message: '' }); setAddress({ village: '', subdistrict: '', district: '', state: '', country: 'India' }); setQuery(''); }}
        style={{ marginTop: '24px', padding: '12px 24px', background: '#4299e1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>
        Submit Another
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1a365d', marginBottom: '4px' }}>📋 Contact Form</h2>
        <p style={{ color: '#718096', marginBottom: '24px' }}>Powered by VillageAPI autocomplete</p>

        {/* Personal Info */}
        {[
          { label: 'Full Name *', key: 'fullName', type: 'text', placeholder: 'John Doe' },
          { label: 'Email Address *', key: 'email', type: 'email', placeholder: 'john@example.com' },
          { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 9876543210' },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#2d3748', marginBottom: '6px', fontSize: '0.9rem' }}>{f.label}</label>
            <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
              onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '0.95rem', boxSizing: 'border-box' }} />
          </div>
        ))}

        {/* Village Autocomplete */}
        <div style={{ marginBottom: '16px', position: 'relative' }}>
          <label style={{ display: 'block', fontWeight: '600', color: '#2d3748', marginBottom: '6px', fontSize: '0.9rem' }}>
            Village/Area * {loading && <span style={{ color: '#4299e1', fontSize: '0.8rem' }}>searching...</span>}
          </label>
          <input type="text" placeholder="Type village name (min 2 chars)..." value={query}
            onChange={e => { setQuery(e.target.value); setAddress({ village: '', subdistrict: '', district: '', state: '', country: 'India' }); }}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            style={{ width: '100%', padding: '10px 14px', border: '2px solid #4299e1', borderRadius: '8px', fontSize: '0.95rem', boxSizing: 'border-box' }} />
          {showSuggestions && suggestions.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '2px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', zIndex: 100, maxHeight: '200px', overflowY: 'auto' }}>
              {suggestions.map((s, i) => (
                <div key={i} onClick={() => selectVillage(s)}
                  style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #f0f4f8', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.target.style.background = '#ebf8ff'}
                  onMouseLeave={e => e.target.style.background = 'white'}>
                  <div style={{ fontWeight: '600', color: '#2d3748' }}>{s.label}</div>
                  <div style={{ fontSize: '0.8rem', color: '#718096' }}>{s.hierarchy.subDistrict}, {s.hierarchy.district}, {s.hierarchy.state}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auto-filled address fields */}
        {address.village && (
          <div style={{ background: '#f0fff4', border: '2px solid #48bb78', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
            <p style={{ color: '#276749', fontWeight: '600', margin: '0 0 8px' }}>✅ Address Auto-filled:</p>
            {[
              { label: 'Village', value: address.village },
              { label: 'Sub-District', value: address.subdistrict },
              { label: 'District', value: address.district },
              { label: 'State', value: address.state },
              { label: 'Country', value: address.country },
            ].map(f => (
              <div key={f.label} style={{ display: 'flex', gap: '12px', marginBottom: '6px' }}>
                <span style={{ color: '#718096', fontSize: '0.85rem', minWidth: '80px' }}>{f.label}:</span>
                <input value={f.value} readOnly
                  style={{ flex: 1, padding: '6px 10px', background: 'white', border: '1px solid #c6f6d5', borderRadius: '6px', fontSize: '0.85rem', color: '#2d3748' }} />
              </div>
            ))}
          </div>
        )}

        {/* Message */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', color: '#2d3748', marginBottom: '6px', fontSize: '0.9rem' }}>Message</label>
          <textarea placeholder="Your message..." value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{ width: '100%', padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '0.95rem', boxSizing: 'border-box', height: '100px', resize: 'vertical' }} />
        </div>

        <button onClick={handleSubmit}
          style={{ width: '100%', padding: '14px', background: '#1a365d', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>
          Submit Form
        </button>

        <p style={{ textAlign: 'center', marginTop: '16px', color: '#a0aec0', fontSize: '0.8rem' }}>
          🔌 Powered by VillageAPI — Address autocomplete for India
        </p>
      </div>
    </div>
  );
}
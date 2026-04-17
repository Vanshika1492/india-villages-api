import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const usageData = [
  { day: 'Mon', requests: 1200 },
  { day: 'Tue', requests: 1900 },
  { day: 'Wed', requests: 1500 },
  { day: 'Thu', requests: 2800 },
  { day: 'Fri', requests: 2200 },
  { day: 'Sat', requests: 900 },
  { day: 'Sun', requests: 600 },
];

const mockKeys = [
  { name: 'Production', key: 'ak_****abcd', created: '2024-01-01', lastUsed: '2024-01-15', status: 'Active' },
  { name: 'Staging', key: 'ak_****efgh', created: '2024-01-10', lastUsed: '2024-01-14', status: 'Active' },
];

export default function UserDashboard({ user, onLogout }) {
  const [page, setPage] = useState('dashboard');
  const [keys, setKeys] = useState(mockKeys);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState(null);

  const generateKey = () => {
    if (!newKeyName) return alert('Enter a key name');
    const newKey = {
      name: newKeyName,
      key: `ak_xxxx${Math.random().toString(36).substr(2, 4)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'Active'
    };
    setGeneratedKey({ ...newKey, secret: `as_${Math.random().toString(36).substr(2, 32)}` });
    setKeys([...keys, newKey]);
    setNewKeyName('');
  };

  const navItems = [
    { icon: '📊', label: 'Dashboard', page: 'dashboard' },
    { icon: '🔑', label: 'API Keys', page: 'keys' },
    { icon: '📈', label: 'Usage', page: 'usage' },
    { icon: '📚', label: 'Docs', page: 'docs' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f4f8' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', background: '#1a365d', padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #2d4a7a' }}>
          <h3 style={{ color: 'white', margin: 0, fontSize: '1rem' }}>🇮🇳 VillageAPI</h3>
          <p style={{ color: '#90cdf4', margin: '4px 0 0', fontSize: '0.75rem' }}>{user.name}</p>
          <span style={{ background: '#4299e1', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem' }}>{user.plan}</span>
        </div>
        <nav style={{ padding: '12px 0', flex: 1 }}>
          {navItems.map(item => (
            <div key={item.page} onClick={() => setPage(item.page)}
              style={{ padding: '12px 20px', cursor: 'pointer', color: page === item.page ? 'white' : '#90cdf4',
                background: page === item.page ? '#2d4a7a' : 'transparent',
                borderLeft: page === item.page ? '3px solid #4299e1' : '3px solid transparent',
                display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span>{item.icon}</span>
              <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
            </div>
          ))}
        </nav>
        <div style={{ padding: '20px' }}>
          <button onClick={onLogout}
            style={{ width: '100%', padding: '10px', background: '#fc8181', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>

        {/* Dashboard Page */}
        {page === 'dashboard' && (
          <div>
            <h1 style={{ color: '#2d3748', marginBottom: '24px' }}>Welcome back, {user.name}! 👋</h1>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {[
                { label: "Today's Requests", value: '2,847', sub: 'of 300,000 daily limit' },
                { label: 'This Month', value: '48,291', sub: 'total requests' },
                { label: 'Avg Response Time', value: '47ms', sub: 'last 24 hours' },
                { label: 'Success Rate', value: '99.8%', sub: 'all requests' },
              ].map(card => (
                <div key={card.label} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', flex: 1, minWidth: '150px' }}>
                  <p style={{ color: '#718096', fontSize: '0.8rem', margin: 0 }}>{card.label}</p>
                  <h2 style={{ color: '#2d3748', margin: '8px 0 4px', fontSize: '1.6rem' }}>{card.value}</h2>
                  <p style={{ color: '#a0aec0', fontSize: '0.75rem', margin: 0 }}>{card.sub}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: '#2d3748', marginBottom: '16px' }}>📈 Requests This Week</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="requests" stroke="#4299e1" strokeWidth={2} dot={{ fill: '#4299e1' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* API Keys Page */}
        {page === 'keys' && (
          <div>
            <h1 style={{ color: '#2d3748', marginBottom: '24px' }}>🔑 API Key Management</h1>
            {generatedKey && (
              <div style={{ background: '#f0fff4', border: '2px solid #48bb78', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                <h3 style={{ color: '#276749', marginBottom: '12px' }}>⚠️ Save your secret now!</h3>
                <p><strong>API Key:</strong> <code style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>{generatedKey.key}</code></p>
                <p><strong>Secret:</strong> <code style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>{generatedKey.secret}</code></p>
                <button onClick={() => setGeneratedKey(null)}
                  style={{ marginTop: '12px', padding: '8px 16px', background: '#48bb78', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  I've saved it ✓
                </button>
              </div>
            )}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ color: '#2d3748', marginBottom: '16px' }}>Create New Key</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input value={newKeyName} onChange={e => setNewKeyName(e.target.value)}
                  placeholder="e.g. Production Server"
                  style={{ flex: 1, padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '0.95rem' }} />
                <button onClick={generateKey}
                  style={{ padding: '10px 20px', background: '#4299e1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  Generate Key
                </button>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f7fafc' }}>
                    {['Key Name', 'API Key', 'Created', 'Last Used', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#718096', fontSize: '0.85rem' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {keys.map((k, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '14px 16px', fontWeight: '600', color: '#2d3748' }}>{k.name}</td>
                      <td style={{ padding: '14px 16px' }}><code style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>{k.key}</code></td>
                      <td style={{ padding: '14px 16px', color: '#718096' }}>{k.created}</td>
                      <td style={{ padding: '14px 16px', color: '#718096' }}>{k.lastUsed}</td>
                      <td style={{ padding: '14px 16px' }}><span style={{ background: '#f0fff4', color: '#48bb78', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>{k.status}</span></td>
                      <td style={{ padding: '14px 16px' }}>
                        <button style={{ padding: '6px 12px', background: '#fc8181', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Revoke</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Usage Page */}
        {page === 'usage' && (
          <div>
            <h1 style={{ color: '#2d3748', marginBottom: '24px' }}>📈 Usage Statistics</h1>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: '#2d3748', marginBottom: '16px' }}>Daily Requests (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="requests" stroke="#4299e1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Docs Page */}
        {page === 'docs' && (
          <div>
            <h1 style={{ color: '#2d3748', marginBottom: '24px' }}>📚 API Documentation</h1>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: '#2d3748' }}>Quick Start</h3>
              <pre style={{ background: '#1a202c', color: '#68d391', padding: '16px', borderRadius: '8px', overflow: 'auto', marginTop: '12px', fontSize: '0.85rem' }}>
{`# (For local development, use http://localhost:3000. For production, use your actual API domain.)
<p># Get all states</p>
<pre>
curl -H "x-api-key: YOUR_KEY" http://localhost:3000/v1/states
</pre>

<p># Search villages</p>  
curl -H "x-api-key: YOUR_KEY" https://api.example.com/v1/search?q=Manibeli

<p># Autocomplete</p>
curl -H "x-api-key: YOUR_KEY" https://api.example.com/v1/autocomplete?q=Man`}
              </pre>
              <h3 style={{ color: '#2d3748', marginTop: '24px' }}>Endpoints</h3>
              {[
                { method: 'GET', path: '/v1/states', desc: 'List all states' },
                { method: 'GET', path: '/v1/districts?state_id=1', desc: 'Districts by state (requires numeric state_id as query parameter, e.g., state_id=1)' },
                { method: 'GET', path: '/v1/subdistricts?district_id=1', desc: 'Subdistricts' },
                { method: 'GET', path: '/v1/villages?subdistrict_id=1', desc: 'Villages' },
                { method: 'GET', path: '/v1/search?q=village', desc: 'Search villages' },
                { method: 'GET', path: '/v1/autocomplete?q=man', desc: 'Autocomplete' },
              ].map(ep => (
                <div key={ep.path} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ background: '#ebf8ff', color: '#2b6cb0', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', minWidth: '45px', textAlign: 'center' }}>{ep.method}</span>
                  <code style={{ color: '#4299e1', flex: 1, fontSize: '0.85rem' }}>{ep.path}</code>
                  <span style={{ color: '#718096', fontSize: '0.9rem' }}>{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
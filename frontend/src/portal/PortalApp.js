import React, { useState } from 'react';

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = () => {
    if (!email || !password) return alert('Enter email and password');
    onLogin({ email, name: 'Acme Corp', plan: 'Pro' });
  };
  return (
    <div style={{ maxWidth: '420px', margin: '80px auto', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1a365d' }}>🔐 Login</h2>
        <p style={{ color: '#718096' }}>Access your API dashboard</p>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="api@company.com"
            style={{ width: '100%', padding: '10px', border: '2px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Your password"
            style={{ width: '100%', padding: '10px', border: '2px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }} />
        </div>
        <button onClick={submit}
          style={{ width: '100%', padding: '14px', background: '#1a365d', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}>
          Login
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#718096' }}>
          No account? <span onClick={() => onSwitch('register')} style={{ color: '#4299e1', cursor: 'pointer' }}>Register</span>
        </p>
      </div>
    </div>
  );
}

function Register({ onSwitch }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ businessName: '', email: '', password: '', confirm: '' });
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = () => {
    if (!form.businessName || !form.email || !form.password) return alert('Fill all fields');
    if (form.password !== form.confirm) return alert('Passwords do not match');
    setSubmitted(true);
  };
  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
      <div style={{ fontSize: '4rem' }}>✅</div>
      <h2>Registration Submitted!</h2>
      <p style={{ color: '#718096' }}>Pending admin approval. You'll receive an email when approved.</p>
      <button onClick={() => onSwitch('login')}
        style={{ padding: '12px 24px', background: '#4299e1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Back to Login
      </button>
    </div>
  );
  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1a365d' }}>🚀 Create Account</h2>
        <p style={{ color: '#718096', marginBottom: '20px' }}>Register for API access</p>
        {[
          { label: 'Business Name *', name: 'businessName', type: 'text', placeholder: 'Acme Corp' },
          { label: 'Business Email *', name: 'email', type: 'email', placeholder: 'api@company.com' },
          { label: 'Password *', name: 'password', type: 'password', placeholder: 'Min 8 chars' },
          { label: 'Confirm Password *', name: 'confirm', type: 'password', placeholder: 'Repeat password' },
        ].map(f => (
          <div key={f.name} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.9rem' }}>{f.label}</label>
            <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={handle}
              style={{ width: '100%', padding: '10px', border: '2px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }} />
          </div>
        ))}
        <button onClick={submit}
          style={{ width: '100%', padding: '14px', background: '#1a365d', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}>
          Submit for Approval
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#718096' }}>
          Have account? <span onClick={() => onSwitch('login')} style={{ color: '#4299e1', cursor: 'pointer' }}>Login</span>
        </p>
      </div>
    </div>
  );
}

function UserDashboard({ user, onLogout }) {
  const [page, setPage] = useState('dashboard');
  const [keys, setKeys] = useState([
    { name: 'Production', key: 'ak_****abcd', created: '2024-01-01', lastUsed: '2024-01-15', status: 'Active' },
    { name: 'Staging', key: 'ak_****efgh', created: '2024-01-10', lastUsed: '2024-01-14', status: 'Active' },
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState(null);

  const generateKey = () => {
    if (!newKeyName) return alert('Enter a key name');
    const k = { name: newKeyName, key: `ak_xxxx${Math.random().toString(36).substr(2,4)}`, created: new Date().toISOString().split('T')[0], lastUsed: 'Never', status: 'Active' };
    setGeneratedKey({ ...k, secret: `as_${Math.random().toString(36).substr(2,32)}` });
    setKeys(prev => [...prev, k]);
    setNewKeyName('');
  };

  const navItems = [
    { icon: '📊', label: 'Dashboard', page: 'dashboard' },
    { icon: '🔑', label: 'API Keys', page: 'keys' },
    { icon: '📚', label: 'Docs', page: 'docs' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{ width: '220px', background: '#1a365d', padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #2d4a7a' }}>
          <h3 style={{ color: 'white', margin: 0 }}>🇮🇳 VillageAPI</h3>
          <p style={{ color: '#90cdf4', margin: '4px 0', fontSize: '0.8rem' }}>{user.name}</p>
          <span style={{ background: '#4299e1', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem' }}>{user.plan}</span>
        </div>
        <nav style={{ padding: '12px 0', flex: 1 }}>
          {navItems.map(item => (
            <div key={item.page} onClick={() => setPage(item.page)}
              style={{ padding: '12px 20px', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center',
                color: page === item.page ? 'white' : '#90cdf4',
                background: page === item.page ? '#2d4a7a' : 'transparent',
                borderLeft: page === item.page ? '3px solid #4299e1' : '3px solid transparent' }}>
              <span>{item.icon}</span><span style={{ fontSize: '0.9rem' }}>{item.label}</span>
            </div>
          ))}
        </nav>
        <div style={{ padding: '20px' }}>
          <button onClick={onLogout} style={{ width: '100%', padding: '10px', background: '#fc8181', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px' }}>
        {page === 'dashboard' && (
          <div>
            <h1 style={{ color: '#2d3748' }}>Welcome, {user.name}! 👋</h1>
            <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap' }}>
              {[
                { label: "Today's Requests", value: '2,847' },
                { label: 'This Month', value: '48,291' },
                { label: 'Response Time', value: '47ms' },
                { label: 'Success Rate', value: '99.8%' },
              ].map(c => (
                <div key={c.label} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', flex: 1, minWidth: '150px' }}>
                  <p style={{ color: '#718096', fontSize: '0.8rem', margin: 0 }}>{c.label}</p>
                  <h2 style={{ color: '#2d3748', margin: '8px 0 0' }}>{c.value}</h2>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'keys' && (
          <div>
            <h1 style={{ color: '#2d3748' }}>🔑 API Keys</h1>
            {generatedKey && (
              <div style={{ background: '#f0fff4', border: '2px solid #48bb78', borderRadius: '12px', padding: '20px', margin: '20px 0' }}>
                <h3 style={{ color: '#276749' }}>⚠️ Save your secret now!</h3>
                <p><strong>Key:</strong> <code>{generatedKey.key}</code></p>
                <p><strong>Secret:</strong> <code>{generatedKey.secret}</code></p>
                <button onClick={() => setGeneratedKey(null)} style={{ padding: '8px 16px', background: '#48bb78', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Saved ✓</button>
              </div>
            )}
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', margin: '20px 0' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="Key name e.g. Production"
                  style={{ flex: 1, padding: '10px', border: '2px solid #e2e8f0', borderRadius: '8px' }} />
                <button onClick={generateKey} style={{ padding: '10px 20px', background: '#4299e1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Generate</button>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: '#f7fafc' }}>
                  {['Name', 'API Key', 'Created', 'Last Used', 'Status', 'Action'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#718096', fontSize: '0.85rem' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>{keys.map((k, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '600' }}>{k.name}</td>
                    <td style={{ padding: '12px 16px' }}><code style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>{k.key}</code></td>
                    <td style={{ padding: '12px 16px', color: '#718096' }}>{k.created}</td>
                    <td style={{ padding: '12px 16px', color: '#718096' }}>{k.lastUsed}</td>
                    <td style={{ padding: '12px 16px' }}><span style={{ background: '#f0fff4', color: '#48bb78', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>{k.status}</span></td>
                    <td style={{ padding: '12px 16px' }}><button style={{ padding: '6px 12px', background: '#fc8181', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Revoke</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {page === 'docs' && (
          <div>
            <h1 style={{ color: '#2d3748' }}>📚 API Documentation</h1>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <pre style={{ background: '#1a202c', color: '#68d391', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
{`curl -H "x-api-key: YOUR_KEY" http://localhost:3000/v1/states
curl -H "x-api-key: YOUR_KEY" http://localhost:3000/v1/search?q=Manibeli`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PortalApp() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState(null);

  if (user) return <UserDashboard user={user} onLogout={() => setUser(null)} />;

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{ background: '#1a365d', padding: '16px 24px', textAlign: 'center' }}>
        <h2 style={{ color: 'white', margin: 0 }}>🇮🇳 VillageAPI — B2B Portal</h2>
      </div>
      {screen === 'login'
        ? <Login onLogin={setUser} onSwitch={setScreen} />
        : <Register onSwitch={setScreen} />}
    </div>
  );
}
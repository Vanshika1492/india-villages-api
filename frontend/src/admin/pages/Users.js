import React, { useState } from 'react';

const mockUsers = [
  { id: 1, name: 'Acme Corp', email: 'api@acme.com', plan: 'Pro', status: 'Active', requests: 12400, joined: '2024-01-10' },
  { id: 2, name: 'DataSync Ltd', email: 'dev@datasync.in', plan: 'Premium', status: 'Active', requests: 8900, joined: '2024-01-15' },
  { id: 3, name: 'MapTech', email: 'admin@maptech.io', plan: 'Free', status: 'Pending', requests: 450, joined: '2024-01-20' },
  { id: 4, name: 'GeoVision', email: 'tech@geovision.com', plan: 'Unlimited', status: 'Active', requests: 89000, joined: '2024-01-05' },
  { id: 5, name: 'StartupXYZ', email: 'founder@startupxyz.in', plan: 'Free', status: 'Suspended', requests: 5000, joined: '2024-01-18' },
];

const statusColor = { Active: '#48bb78', Pending: '#ed8936', Suspended: '#fc8181' };
const planColor = { Free: '#718096', Premium: '#4299e1', Pro: '#9f7aea', Unlimited: '#ed8936' };

export default function Users() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = mockUsers.filter(u =>
    (filter === 'All' || u.status === filter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ color: '#2d3748', marginBottom: '24px' }}>👥 User Management</h1>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '0.95rem', flex: 1, minWidth: '200px' }}
        />
        {['All', 'Active', 'Pending', 'Suspended'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: filter === s ? '#4299e1' : '#e2e8f0', color: filter === s ? 'white' : '#2d3748', fontWeight: '600' }}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f7fafc' }}>
              {['Business', 'Email', 'Plan', 'Status', 'Requests', 'Joined', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#718096', fontSize: '0.85rem', fontWeight: '600' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} style={{ borderTop: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#f7fafc' }}>
                <td style={{ padding: '14px 16px', fontWeight: '600', color: '#2d3748' }}>{u.name}</td>
                <td style={{ padding: '14px 16px', color: '#718096' }}>{u.email}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ background: planColor[u.plan] + '20', color: planColor[u.plan], padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>{u.plan}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ background: statusColor[u.status] + '20', color: statusColor[u.status], padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>{u.status}</span>
                </td>
                <td style={{ padding: '14px 16px', color: '#2d3748' }}>{u.requests.toLocaleString()}</td>
                <td style={{ padding: '14px 16px', color: '#718096' }}>{u.joined}</td>
                <td style={{ padding: '14px 16px' }}>
                  <button style={{ padding: '6px 12px', marginRight: '6px', background: '#48bb78', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Approve</button>
                  <button style={{ padding: '6px 12px', background: '#fc8181', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
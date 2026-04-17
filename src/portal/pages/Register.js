import React, { useState } from 'react';

export default function Register({ onSwitch }) {
  const [form, setForm] = useState({ businessName: '', email: '', phone: '', gst: '', password: '', confirm: '' });
  const [submitted, setSubmitted] = useState(false);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    if (form.password !== form.confirm) return alert('Passwords do not match!');
    if (!form.email || !form.businessName || !form.password) return alert('Fill all required fields!');
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '4rem' }}>✅</div>
      <h2 style={{ color: '#2d3748', marginTop: '16px' }}>Registration Submitted!</h2>
      <p style={{ color: '#718096' }}>Your account is <strong>pending approval</strong>.<br />You'll receive an email once approved.</p>
      <button onClick={() => onSwitch('login')}
        style={{ marginTop: '20px', padding: '12px 24px', background: '#4299e1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>
        Back to Login
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1a365d', marginBottom: '8px' }}>🚀 Create Account</h2>
        <p style={{ color: '#718096', marginBottom: '24px' }}>Register for API access</p>
        {[
          { label: 'Business Name *', name: 'businessName', type: 'text', placeholder: 'Acme Corporation' },
          { label: 'Business Email *', name: 'email', type: 'email', placeholder: 'api@company.com' },
          { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 9876543210' },
          { label: 'GST Number (optional)', name: 'gst', type: 'text', placeholder: '22AAAAA0000A1Z5' },
          { label: 'Password *', name: 'password', type: 'password', placeholder: 'Min 8 characters' },
          { label: 'Confirm Password *', name: 'confirm', type: 'password', placeholder: 'Repeat password' },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#2d3748', marginBottom: '6px', fontSize: '0.9rem' }}>{field.label}</label>
            <input name={field.name} type={field.type} placeholder={field.placeholder} value={form[field.name]} onChange={handle}
              style={{ width: '100%', padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '0.95rem', boxSizing: 'border-box' }} />
          </div>
        ))}
        <button onClick={submit}
          style={{ width: '100%', padding: '14px', background: '#1a365d', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}>
          Submit for Approval
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#718096', fontSize: '0.9rem' }}>
          Already have an account? <span onClick={() => onSwitch('login')} style={{ color: '#4299e1', cursor: 'pointer', fontWeight: '600' }}>Login</span>
        </p>
      </div>
    </div>
  );
}
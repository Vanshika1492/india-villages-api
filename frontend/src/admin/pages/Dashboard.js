import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const barData = [
  { state: 'UP', villages: 97941 },
  { state: 'MP', villages: 54903 },
  { state: 'Bihar', villages: 44874 },
  { state: 'Raj', villages: 44794 },
  { state: 'MH', villages: 43722 },
  { state: 'WB', villages: 40782 },
  { state: 'AP', villages: 28293 },
  { state: 'Guj', villages: 18618 },
  { state: 'Kar', villages: 29736 },
  { state: 'TN', villages: 15400 },
];

const lineData = [
  { day: 'Day 1', requests: 1200 },
  { day: 'Day 5', requests: 1900 },
  { day: 'Day 10', requests: 1500 },
  { day: 'Day 15', requests: 2800 },
  { day: 'Day 20', requests: 2200 },
  { day: 'Day 25', requests: 3100 },
  { day: 'Day 30', requests: 2700 },
];

const pieData = [
  { name: 'Free', value: 540 },
  { name: 'Premium', value: 210 },
  { name: 'Pro', value: 89 },
  { name: 'Unlimited', value: 23 },
];

const COLORS = ['#4299e1', '#48bb78', '#ed8936', '#9f7aea'];

const MetricCard = ({ title, value, change, color }) => (
  <div style={{
    background: 'white', padding: '20px', borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)', flex: 1
  }}>
    <p style={{ color: '#718096', fontSize: '0.85rem', margin: 0 }}>{title}</p>
    <h2 style={{ color: '#2d3748', margin: '8px 0', fontSize: '1.8rem' }}>{value}</h2>
    <p style={{ color: color || '#48bb78', margin: 0, fontSize: '0.85rem' }}>{change}</p>
  </div>
);

export default function Dashboard() {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ color: '#2d3748', marginBottom: '24px' }}>📊 Admin Dashboard</h1>

      {/* Metric Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <MetricCard title="Total Villages" value="6,40,867" change="↑ 2.3% this month" />
        <MetricCard title="Active Users" value="862" change="↑ 12 today" />
        <MetricCard title="Today's API Requests" value="48,291" change="↑ 8% vs yesterday" />
        <MetricCard title="Avg Response Time" value="47ms" change="↓ 3ms improvement" color="#48bb78" />
      </div>

      {/* Bar Chart */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
        <h3 style={{ color: '#2d3748', marginBottom: '16px' }}>Top 10 States by Village Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="villages" fill="#4299e1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line + Pie Charts */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', flex: 2, minWidth: '300px' }}>
          <h3 style={{ color: '#2d3748', marginBottom: '16px' }}>API Requests (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="#4299e1" strokeWidth={2} dot={{ fill: '#4299e1' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', flex: 1, minWidth: '250px' }}>
          <h3 style={{ color: '#2d3748', marginBottom: '16px' }}>Users by Plan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
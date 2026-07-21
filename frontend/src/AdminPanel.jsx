import React, { useState, useEffect } from 'react';
import { API_BASE } from './App'; // Make sure API_BASE is exported or redefine it

export default function AdminPanel({ onClose }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${API_BASE}/admin/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = (email) => {
    fetch(`${API_BASE}/admin/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, status: 'approved' })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) fetchUsers();
    });
  };
  
  const handleRevoke = (email) => {
    fetch(`${API_BASE}/admin/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, status: 'pending' })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) fetchUsers();
    });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, fontFamily: 'var(--font-mono)'
    }}>
      <div style={{
        background: 'var(--bg-main)',
        border: 'var(--border-thick)',
        borderRadius: '12px',
        width: '90%', maxWidth: '600px',
        maxHeight: '80vh', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: 'var(--border-thick)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-panel)' }}>
          <h2 style={{ color: 'var(--accent-purple)' }}>Kullanıcı Yönetimi</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>
        
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {loading ? (
            <p>Yükleniyor...</p>
          ) : users.length === 0 ? (
            <p>Sistemde henüz kullanıcı yok.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {users.map(u => (
                <div key={u.email} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1rem', background: 'var(--bg-panel)', border: '1px solid var(--bg-inner)', borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: 'var(--text-light)' }}>{u.name || "İsimsiz Kullanıcı"}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{u.email}</div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      marginTop: '0.5rem',
                      display: 'inline-block',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: u.status === 'approved' ? 'rgba(52, 168, 83, 0.2)' : 'rgba(251, 188, 5, 0.2)',
                      color: u.status === 'approved' ? '#34a853' : '#fbbc05'
                    }}>
                      {u.status === 'approved' ? 'ONAYLI' : 'BEKLİYOR'}
                    </div>
                  </div>
                  <div>
                    {u.status === 'pending' ? (
                      <button 
                        className="neo-button" 
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', backgroundColor: '#34a853', color: '#fff', borderColor: '#000' }}
                        onClick={() => handleApprove(u.email)}
                      >
                        Onayla
                      </button>
                    ) : (
                      <button 
                        className="neo-button" 
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', backgroundColor: 'var(--bg-inner)', color: 'var(--text-light)' }}
                        onClick={() => handleRevoke(u.email)}
                      >
                        İptal Et
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { logout } from './firebase';

export default function PendingScreen({ user }) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-main)',
      color: 'var(--text-light)',
      fontFamily: 'var(--font-mono)'
    }}>
      <div style={{
        background: 'var(--bg-panel)',
        padding: '3rem',
        borderRadius: '12px',
        border: 'var(--border-thick)',
        boxShadow: '8px 8px 0px rgba(0,0,0,0.5)',
        textAlign: 'center',
        maxWidth: '450px',
        width: '100%'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <h2 style={{ color: 'var(--accent-orange)', marginBottom: '1rem' }}>Onay Bekleniyor</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.5', color: 'var(--text-light)' }}>
          Merhaba <strong>{user?.displayName || user?.email}</strong>,<br/>
          Hesabınız başarıyla oluşturuldu ancak sisteme giriş yapabilmeniz için yönetici onayı gerekmektedir.
        </p>
        <p style={{ marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Lütfen yöneticinin hesabınızı onaylamasını bekleyin. Onaylandıktan sonra sayfayı yenileyebilirsiniz.
        </p>

        <button 
          onClick={logout}
          className="neo-button"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            color: 'var(--text-light)',
            border: '1px solid var(--text-muted)'
          }}
        >
          Farklı bir hesapla gir
        </button>
      </div>
    </div>
  );
}

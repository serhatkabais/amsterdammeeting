import React, { useState } from 'react';
import { signInWithGoogle } from './firebase';

export default function AuthScreen({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await signInWithGoogle();
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || "Giriş yaparken bir hata oluştu.");
      setLoading(false);
    }
  };

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
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ color: 'var(--accent-yellow)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          Dutch EdTech Outreach
        </h1>
        <p style={{ marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Sisteme erişmek için yetkili bir Google hesabı ile giriş yapmanız gerekmektedir.
        </p>

        {error && (
          <div style={{ background: 'rgba(255,50,50,0.1)', color: 'var(--accent-orange)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.8rem' }}>
            {error}
          </div>
        )}

        <button 
          onClick={handleLogin}
          disabled={loading}
          className="neo-button"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            backgroundColor: '#fff',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          {loading ? 'Giriş yapılıyor...' : (
            <>
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Google ile Giriş Yap
            </>
          )}
        </button>
      </div>
    </div>
  );
}

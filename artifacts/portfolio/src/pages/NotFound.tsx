import { useLocation } from 'wouter';

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '12px',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono, "Geist Mono", monospace)',
    }}>
      <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>// 404</span>
      <span style={{ fontSize: '15px', color: 'var(--text)' }}>halaman tidak ditemukan</span>
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '8px',
          fontSize: '12px',
          color: 'var(--blue)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          fontFamily: 'inherit',
        }}
      >
        ← kembali ke beranda
      </button>
    </div>
  );
}

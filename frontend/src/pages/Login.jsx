import { useAuth } from '../hooks/useAuth';
import styles from './Login.module.css';

export default function Login() {
  const { login } = useAuth();

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#E8A838" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className={styles.brandName}>
            Mesa<b>Tech</b>
          </div>
        </div>
        <p className={styles.tagline}>
          Plataforma de gestión de soporte tecnológico
        </p>

        <div className={styles.divider}>
          <hr />
          <span>Acceso corporativo</span>
          <hr />
        </div>

        <button className={styles.msBtn} onClick={login}>
          <MsLogo />
          Iniciar sesión con Microsoft
        </button>

        <p className={styles.note}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Autenticación gestionada por Microsoft Entra ID
        </p>
      </div>
    </div>
  );
}

function MsLogo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: 20, height: 20, flexShrink: 0 }}>
      <div style={{ background: '#F25022', borderRadius: 1 }} />
      <div style={{ background: '#7FBA00', borderRadius: 1 }} />
      <div style={{ background: '#00A4EF', borderRadius: 1 }} />
      <div style={{ background: '#FFB900', borderRadius: 1 }} />
    </div>
  );
}

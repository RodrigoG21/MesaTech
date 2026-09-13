import { useAuth } from '../hooks/useAuth';
import styles from './JwtStrip.module.css';

export function JwtStrip() {
  const { user } = useAuth();
  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={styles.strip}>
      <div className={styles.user}>
        <div className={styles.avatar}>{initials}</div>
        <div>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.email}>{user.email}</div>
        </div>
      </div>
      <div className={styles.sep} />
      <div className={styles.claimsLabel}>Claims del token</div>
      <div className={styles.claims}>
        <span className={styles.claim}>
          <span className={styles.ck}>name </span>
          <span className={styles.cv}>{user.name}</span>
        </span>
        <span className={`${styles.claim} ${styles.claimRole}`}>
          <span className={styles.ck}>roles </span>
          <span className={styles.cv}>["{user.role}"]</span>
        </span>
        <span className={styles.claim}>
          <span className={styles.ck}>iss </span>
          <span className={styles.cv}>login.microsoftonline.com/…</span>
        </span>
      </div>
    </div>
  );
}

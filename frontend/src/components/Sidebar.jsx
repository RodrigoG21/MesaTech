import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './Sidebar.module.css';

const ROLE_CONFIG = {
  CLIENTE: {
    label: 'Cliente',
    cls: 'roleC',
    nav: [
      { to: '/mis-solicitudes', label: 'Mis Solicitudes', icon: IconList },
      { to: '/nueva-solicitud', label: 'Nueva Solicitud', icon: IconPlus },
    ],
  },
  OPERADOR: {
    label: 'Operador',
    cls: 'roleO',
    nav: [
      { to: '/solicitudes', label: 'Todas las Solicitudes', icon: IconList },
      { to: '/mis-solicitudes', label: 'Mis Asignadas', icon: IconAssign },
    ],
  },
  ADMINISTRADOR: {
    label: 'Administrador',
    cls: 'roleA',
    nav: [
      { to: '/solicitudes', label: 'Todas las Solicitudes', icon: IconList },
      { to: '/mis-solicitudes', label: 'Mis Solicitudes', icon: IconAssign },
      { to: '/catalogo', label: 'Catálogo', icon: IconGrid },
    ],
  },
};

export function Sidebar() {
  const { user, role, logout } = useAuth();
  if (!user) return null;

  const config = ROLE_CONFIG[role] || ROLE_CONFIG.CLIENTE;
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandName}>
          Mesa<b>Tech</b>
        </div>
        <span className={`${styles.roleBadge} ${styles[config.cls]}`}>
          {config.label}
        </span>
      </div>

      <nav className={styles.nav}>
        {config.nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.item}${isActive ? ' ' + styles.active : ''}`
            }
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.user}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{user.name}</div>
          <div className={styles.userEmail}>{user.email}</div>
        </div>
        <button className={styles.logout} onClick={logout} title="Cerrar sesión">
          <IconLogout />
        </button>
      </div>
    </aside>
  );
}

function IconList() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="3" cy="6" r="1" fill="currentColor" /><circle cx="3" cy="12" r="1" fill="currentColor" /><circle cx="3" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function IconAssign() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

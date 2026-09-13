import styles from './Badge.module.css';

const ESTADO_LABELS = {
  CREADA: 'Creada',
  ASIGNADA: 'Asignada',
  EN_PROCESO: 'En Proceso',
  RESUELTA: 'Resuelta',
  CERRADA: 'Cerrada',
  CANCELADA: 'Cancelada',
};

export function EstadoBadge({ estado }) {
  return (
    <span className={`${styles.badge} ${styles[estado]}`}>
      {ESTADO_LABELS[estado] || estado}
    </span>
  );
}

export function PrioridadBadge({ nombre, nivel }) {
  return (
    <span className={`${styles.prio} ${styles['p' + nivel]}`}>{nombre}</span>
  );
}

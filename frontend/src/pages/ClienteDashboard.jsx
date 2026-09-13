import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import { JwtStrip } from '../components/JwtStrip';
import { EstadoBadge, PrioridadBadge } from '../components/Badge';
import styles from './Page.module.css';

export default function ClienteDashboard() {
  const api = useApi();
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.get('/v1/solicitudes/mias');
      setSolicitudes(data);
    } catch (e) {
      setError('No se pudo cargar las solicitudes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  const total = solicitudes.length;
  const enProceso = solicitudes.filter((s) => s.estado === 'EN_PROCESO').length;
  const resueltas = solicitudes.filter((s) => s.estado === 'RESUELTA').length;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Mis Solicitudes</h1>
          <p className={styles.sub}>Solicitudes creadas por tu cuenta</p>
        </div>
        <Link to="/nueva-solicitud" className={styles.btnAccent}>
          <span>+</span> Nueva solicitud
        </Link>
      </div>

      <div className={styles.content}>
        <JwtStrip />

        <div className={styles.kpiRow}>
          <Kpi label="Mis solicitudes" value={total} dot="#3B82F6" sub="Total" />
          <Kpi label="En proceso" value={enProceso} dot="#E8A838" sub="En atención" />
          <Kpi label="Resueltas" value={resueltas} dot="#10B981" sub="Este mes" />
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>Historial de solicitudes</span>
            <button className={styles.btnGhost} onClick={cargar}>Actualizar</button>
          </div>
          {loading ? (
            <div className={styles.empty}>Cargando…</div>
          ) : error ? (
            <div className={styles.empty} style={{ color: '#DC2626' }}>{error}</div>
          ) : solicitudes.length === 0 ? (
            <div className={styles.empty}>No tienes solicitudes registradas.</div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th><th>Solicitud</th><th>Prioridad</th>
                    <th>Estado</th><th>Asignado a</th><th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((s) => (
                    <tr key={s.id}>
                      <td><span className={styles.solId}>SOL-{String(s.id).padStart(4, '0')}</span></td>
                      <td>
                        <div className={styles.solTitle}>{s.titulo}</div>
                        <div className={styles.solMeta}>{s.categoriaNombre}</div>
                      </td>
                      <td><PrioridadBadge nombre={s.prioridadNombre} nivel={s.prioridadNivel} /></td>
                      <td><EstadoBadge estado={s.estado} /></td>
                      <td><span className={styles.solMeta}>{s.usuarioAsignado || '—'}</span></td>
                      <td><span className={styles.solMeta}>{s.fechaCreacion?.slice(0, 10)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, dot, sub }) {
  return (
    <div className={styles.kpi}>
      <div className={styles.kpiLabel}>{label}</div>
      <div className={styles.kpiValue}>{value}</div>
      <div className={styles.kpiSub}>
        <span className={styles.dot} style={{ background: dot }} />
        {sub}
      </div>
    </div>
  );
}

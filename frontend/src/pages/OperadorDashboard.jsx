import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../hooks/useApi';
import { EstadoBadge, PrioridadBadge } from '../components/Badge';
import styles from './Page.module.css';

const ESTADOS = ['CREADA', 'ASIGNADA', 'EN_PROCESO', 'RESUELTA', 'CERRADA', 'CANCELADA'];

export default function OperadorDashboard() {
  const api = useApi();
  const [data, setData] = useState({ content: [], totalElements: 0 });
  const [filtroEstado, setFiltroEstado] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cambiando, setCambiando] = useState(null);
  const [modalSol, setModalSol] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      const params = { page, size: 10 };
      if (filtroEstado) params.estado = filtroEstado;
      const res = await api.get('/v2/solicitudes', params);
setData({
  content: res.contenido || [],
  totalElements: res.totalElementos || 0,
});
    } catch {
      setData({ content: [], totalElements: 0 });
    } finally {
      setLoading(false);
    }
  }, [page, filtroEstado]);

  useEffect(() => { cargar(); }, [cargar]);

  const abrirModal = (sol) => {
    setModalSol(sol);
    setNuevoEstado(sol.siguientesEstados?.[0] || '');
  };

  const confirmarCambio = async () => {
    if (!nuevoEstado || !modalSol) return;
    try {
      setCambiando(modalSol.id);
      await api.patch(`/v1/solicitudes/${modalSol.id}/estado`, {
        nuevoEstado,
        observaciones: '',
      });
      setModalSol(null);
      cargar();
    } catch (e) {
      alert(e.response?.data?.error || 'Error al cambiar estado.');
    } finally {
      setCambiando(null);
    }
  };

  const sols = data.content || [];
  const total = data.totalElements || 0;
  const totalPages = Math.ceil(total / 10);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Todas las Solicitudes</h1>
          <p className={styles.sub}>Vista global del equipo de soporte</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>Solicitudes</span>
            <div className={styles.filters}>
              <button
                className={`${styles.ftab}${filtroEstado === '' ? ' ' + styles.ftabOn : ''}`}
                onClick={() => { setFiltroEstado(''); setPage(0); }}
              >Todas</button>
              {ESTADOS.slice(0, 4).map((e) => (
                <button
                  key={e}
                  className={`${styles.ftab}${filtroEstado === e ? ' ' + styles.ftabOn : ''}`}
                  onClick={() => { setFiltroEstado(e); setPage(0); }}
                >
                  {e.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className={styles.empty}>Cargando…</div>
          ) : sols.length === 0 ? (
            <div className={styles.empty}>No hay solicitudes.</div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th><th>Solicitud</th><th>Prioridad</th>
                    <th>Estado</th><th>Asignado a</th><th>Días</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {sols.map((s) => (
                    <tr key={s.id}>
                      <td><span className={styles.solId}>SOL-{String(s.id).padStart(4, '0')}</span></td>
                      <td>
                        <div className={styles.solTitle}>{s.titulo}</div>
                        <div className={styles.solMeta}>{s.categoriaNombre} · {s.usuarioSolicitante}</div>
                      </td>
                      <td><PrioridadBadge nombre={s.prioridadNombre} nivel={s.prioridadNivel} /></td>
                      <td><EstadoBadge estado={s.estado} /></td>
                      <td><span className={styles.solMeta}>{s.usuarioAsignado || '—'}</span></td>
                      <td><span className={styles.solMeta}>{s.diasAbierto ?? '—'}</span></td>
                      <td>
                        {s.siguientesEstados?.length > 0 && (
                          <button
                            className={styles.btnPrimary}
                            onClick={() => abrirModal(s)}
                            disabled={cambiando === s.id}
                          >
                            Cambiar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button className={styles.btnGhost} disabled={page === 0} onClick={() => setPage(p => p - 1)}>← Anterior</button>
              <span className={styles.solMeta}>Página {page + 1} de {totalPages} ({total} resultados)</span>
              <button className={styles.btnGhost} disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Siguiente →</button>
            </div>
          )}
        </div>
      </div>

      {modalSol && (
        <div className={styles.overlay} onClick={() => setModalSol(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Cambiar estado</h2>
            <p className={styles.solMeta} style={{ marginBottom: 14 }}>
              SOL-{String(modalSol.id).padStart(4, '0')} — {modalSol.titulo}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <EstadoBadge estado={modalSol.estado} />
              <span style={{ color: 'var(--text-muted)' }}>→</span>
              <select className={styles.fselect} value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)}>
                {modalSol.siguientesEstados.map((e) => (
                  <option key={e} value={e}>{e.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className={styles.btnAccent} onClick={confirmarCambio}>Confirmar</button>
              <button className={styles.btnGhost} onClick={() => setModalSol(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

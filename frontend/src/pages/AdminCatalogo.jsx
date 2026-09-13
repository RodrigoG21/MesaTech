import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../hooks/useApi';
import styles from './Page.module.css';

export default function AdminCatalogo() {
  const api = useApi();
  const [categorias, setCategorias] = useState([]);
  const [prioridades, setPrioridades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalCat, setModalCat] = useState(null); // null | {id?, nombre, descripcion, activo}
  const [savingCat, setSavingCat] = useState(false);

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      const [cats, prios] = await Promise.all([
        api.get('/v1/catalogo/categorias'),
        api.get('/v1/catalogo/prioridades'),
      ]);
      setCategorias(cats);
      setPrioridades(prios);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  const abrirNuevaCat = () => setModalCat({ nombre: '', descripcion: '', activo: true });
  const abrirEditCat = (c) => setModalCat({ ...c });

  const guardarCat = async () => {
    if (!modalCat.nombre.trim()) return;
    try {
      setSavingCat(true);
      if (modalCat.id) {
        await api.put(`/v1/catalogo/categorias/${modalCat.id}`, modalCat);
      } else {
        await api.post('/v1/catalogo/categorias', modalCat);
      }
      setModalCat(null);
      cargar();
    } catch (e) {
      alert(e.response?.data?.error || 'Error al guardar.');
    } finally {
      setSavingCat(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Catálogo</h1>
          <p className={styles.sub}>Gestión de categorías y prioridades</p>
        </div>
      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.empty}>Cargando…</div>
        ) : (
          <div className={styles.catGrid}>
            {/* Categorías */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.cardTitle}>Categorías</span>
                <button className={styles.btnAccent} onClick={abrirNuevaCat}>+ Nueva</button>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr><th>#</th><th>Nombre</th><th>Estado</th><th></th></tr>
                  </thead>
                  <tbody>
                    {categorias.map((c) => (
                      <tr key={c.id}>
                        <td><span className={styles.solId}>{c.id}</span></td>
                        <td>
                          <div className={styles.solTitle}>{c.nombre}</div>
                          <div className={styles.solMeta}>{c.descripcion}</div>
                        </td>
                        <td>
                          <span className={c.activo ? styles.badgeActive : styles.badgeInactive}>
                            {c.activo ? 'Activa' : 'Inactiva'}
                          </span>
                        </td>
                        <td>
                          <button className={styles.btnGhost} onClick={() => abrirEditCat(c)}>Editar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Prioridades (sólo lectura en esta versión) */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.cardTitle}>Prioridades</span>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr><th>Nombre</th><th>Nivel</th><th>Estado</th></tr>
                  </thead>
                  <tbody>
                    {prioridades.map((p) => (
                      <tr key={p.id}>
                        <td className={styles.solTitle}>{p.nombre}</td>
                        <td><span className={styles.solMeta}>Nivel {p.nivel}</span></td>
                        <td>
                          <span className={p.activo ? styles.badgeActive : styles.badgeInactive}>
                            {p.activo ? 'Activa' : 'Inactiva'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {modalCat && (
        <div className={styles.overlay} onClick={() => setModalCat(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>{modalCat.id ? 'Editar categoría' : 'Nueva categoría'}</h2>
            <div className={styles.fg} style={{ marginBottom: 12 }}>
              <label className={styles.flabel}>Nombre *</label>
              <input className={styles.finput} value={modalCat.nombre}
                onChange={(e) => setModalCat((m) => ({ ...m, nombre: e.target.value }))} />
            </div>
            <div className={styles.fg} style={{ marginBottom: 16 }}>
              <label className={styles.flabel}>Descripción</label>
              <input className={styles.finput} value={modalCat.descripcion || ''}
                onChange={(e) => setModalCat((m) => ({ ...m, descripcion: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className={styles.btnAccent} onClick={guardarCat} disabled={savingCat}>
                {savingCat ? 'Guardando…' : 'Guardar'}
              </button>
              <button className={styles.btnGhost} onClick={() => setModalCat(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function DashboardAquaChile({ onNavigateToForm }) {
  const navigate = useNavigate();

  const [solicitudes, setSolicitudes] = useState([]);
  const [estadisticasPublicas, setEstadisticasPublicas] = useState(null);
  const [cargandoPublicas, setCargandoPublicas] = useState(true);
  const [errorPublicas, setErrorPublicas] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamilia, setSelectedFamilia] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cerrandoSesion, setCerrandoSesion] = useState(false);

  useEffect(() => {
    const cargarSolicitudes = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/solicitudes', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('La API no devolvió una lista de solicitudes.');
        }

        setSolicitudes(data);
      } catch (err) {
        console.error('Error al cargar solicitudes:', err);
        setError('No fue posible cargar las solicitudes. Comprueba que el servidor esté funcionando.');
      } finally {
        setLoading(false);
      }
    };

    cargarSolicitudes();
  }, []);

  useEffect(() => {
    const cargarEstadisticasPublicas = async () => {
      try {
        setCargandoPublicas(true);
        setErrorPublicas('');

        const response = await fetch('/api/postulaciones-publicas/estadisticas', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();
        setEstadisticasPublicas(data);
      } catch (err) {
        console.error('Error al cargar estadísticas de postulaciones públicas:', err);
        setErrorPublicas('No fue posible cargar las estadísticas de postulaciones externas.');
      } finally {
        setCargandoPublicas(false);
      }
    };

    cargarEstadisticasPublicas();
  }, []);

  const handleLogout = async () => {
    try {
      setCerrandoSesion(true);

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('No fue posible cerrar la sesión.');
      }

      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      setError('No fue posible cerrar la sesión. Inténtalo nuevamente.');
    } finally {
      setCerrandoSesion(false);
    }
  };

  const familias = useMemo(() => {
    return [
      ...new Set(
        solicitudes
          .map((item) => item.familiaCargo)
          .filter(Boolean)
      ),
    ].sort();
  }, [solicitudes]);

  const solicitudesFiltradas = useMemo(() => {
    const termino = searchTerm.trim().toLowerCase();

    return solicitudes.filter((item) => {
      const coincideBusqueda = [
        item.idSolicitud,
        item.nombreCandidato,
        item.cargo,
        item.familiaCargo,
      ].some((valor) =>
        String(valor ?? '').toLowerCase().includes(termino)
      );

      const coincideFamilia =
        !selectedFamilia || item.familiaCargo === selectedFamilia;

      const coincideEstado =
        !selectedEstado || item.estado === selectedEstado;

      return coincideBusqueda && coincideFamilia && coincideEstado;
    });
  }, [solicitudes, searchTerm, selectedFamilia, selectedEstado]);

  const totalSolicitudes = solicitudes.length;

  const pendientes = solicitudes.filter(
    (item) => item.estado === 'Pendiente'
  ).length;

  const enProceso = solicitudes.filter(
    (item) => item.estado === 'En proceso'
  ).length;

  const finalizadas = solicitudes.filter(
    (item) => item.estado === 'Finalizada'
  ).length;

  const distribucionFamilias = useMemo(() => {
    const conteo = {};

    solicitudes.forEach((item) => {
      const familia = item.familiaCargo || 'Sin familia';
      conteo[familia] = (conteo[familia] || 0) + 1;
    });

    return Object.entries(conteo).sort((a, b) => b[1] - a[1]);
  }, [solicitudes]);

  const formatearFecha = (fecha) => {
    if (!fecha) return '—';

    const fechaTexto = String(fecha).slice(0, 10);
    const partes = fechaTexto.split('-');

    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    return fechaTexto;
  };

  const getBadgeStyle = (estado) => {
    switch (estado) {
      case 'Finalizada':
        return 'status-finished';
      case 'En proceso':
        return 'status-progress';
      case 'Pendiente':
        return 'status-pending';
      default:
        return 'status-default';
    }
  };

  const limpiarFiltros = () => {
    setSearchTerm('');
    setSelectedFamilia('');
    setSelectedEstado('');
  };

  return (
    <div className="dashboard">

      {/* ENCABEZADO */}
      <header className="dashboard-header">
        <div className="dashboard-header-inner">

          <div className="dashboard-brand">
            <img
              src="/AquaChileLogoBlanco.png"
              alt="AquaChile"
              className="dashboard-logo"
            />

            <div className="dashboard-brand-divider" />

            <span className="dashboard-module">
              Módulo de Reclutamiento y Selección
            </span>
          </div>

          <div className="dashboard-user">
            <span className="dashboard-user-name">
              Usuario: analista.reclutamiento
            </span>

            <button
              type="button"
              className="dashboard-logout"
              onClick={handleLogout}
              disabled={cerrandoSesion}
            >
              {cerrandoSesion ? 'Cerrando...' : 'Cerrar sesión'}
            </button>
          </div>

        </div>
      </header>

      <main className="dashboard-main">

        {/* TÍTULO Y ACCIÓN PRINCIPAL */}
        <section className="dashboard-heading">

          <div>
            <h1>Panel de Control de Selección</h1>
            <p>
              Gestión centralizada de postulaciones y evaluaciones psicolaborales.
            </p>
          </div>

          <button
            type="button"
            className="dashboard-primary-button"
            onClick={onNavigateToForm}
          >
            + Registrar Nuevo Candidato
          </button>

        </section>

        {error && (
          <div className="dashboard-error" role="alert">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Volver a intentar
            </button>
          </div>
        )}

        {/* INDICADORES */}
        <section className="dashboard-stats">

          <article className="stat-card stat-total">
            <span className="stat-label">TOTAL DE SOLICITUDES</span>
            <strong>{loading ? '—' : totalSolicitudes}</strong>
            <p>Registros obtenidos desde la API</p>
          </article>

          <article className="stat-card stat-pending">
            <span className="stat-label">PENDIENTES</span>
            <strong>{loading ? '—' : pendientes}</strong>
            <p>Solicitudes por gestionar</p>
          </article>

          <article className="stat-card stat-progress">
            <span className="stat-label">EN PROCESO</span>
            <strong>{loading ? '—' : enProceso}</strong>
            <p>Solicitudes en evaluación</p>
          </article>

          <article className="stat-card stat-finished">
            <span className="stat-label">FINALIZADAS</span>
            <strong>{loading ? '—' : finalizadas}</strong>
            <p>Solicitudes finalizadas</p>
          </article>

        </section>

        {/* POSTULACIONES EXTERNAS */}
        <section className="dashboard-public-applications">
          <div className="dashboard-public-heading">
            <h2>POSTULACIONES EXTERNAS</h2>
            <p>Postulaciones recibidas mediante el formulario público.</p>
          </div>

          <div className="dashboard-public-metrics">
            <article className="dashboard-public-metric">
              <span>TOTAL RECIBIDAS</span>
              <strong>{cargandoPublicas ? '—' : estadisticasPublicas?.total ?? 0}</strong>
            </article>

            <article className="dashboard-public-metric pending">
              <span>PENDIENTES DE REVISIÓN</span>
              <strong>{cargandoPublicas ? '—' : estadisticasPublicas?.pendientes ?? 0}</strong>
            </article>
          </div>

          {errorPublicas && (
            <p className="dashboard-public-error" role="alert">
              {errorPublicas}
            </p>
          )}
        </section>

        {/* FILTROS */}
        <section className="dashboard-filters">

          <div className="filter-grid row g-3 align-items-end">

            <div className="col-12 filter-field">
              <label htmlFor="buscar" className="form-label">
                Buscar solicitud
              </label>

              <input
                id="buscar"
                type="text"
                className="form-control"
                placeholder="Buscar por candidato, código o cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-12 filter-field">
              <label htmlFor="familia" className="form-label">
                Familia de cargo
              </label>

              <select
                id="familia"
                className="form-select"
                value={selectedFamilia}
                onChange={(e) => setSelectedFamilia(e.target.value)}
              >
                <option value="">Todas las familias</option>

                {familias.map((familia) => (
                  <option key={familia} value={familia}>
                    {familia}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 filter-field">
              <label htmlFor="estado" className="form-label">
                Estado de solicitud
              </label>

              <select
                id="estado"
                className="form-select"
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En proceso">En proceso</option>
                <option value="Finalizada">Finalizada</option>
              </select>
            </div>

            <div className="col-12 filter-actions">
              <button
                type="button"
                className="dashboard-secondary-button"
                onClick={limpiarFiltros}
              >
                Limpiar filtros
              </button>
            </div>

          </div>
        </section>

        {/* TABLA */}
        <section className="dashboard-list">

          <div className="table-heading">
            <h2>LISTADO DE SOLICITUDES DE EVALUACIÓN</h2>

            <span>
              {loading
                ? 'Cargando registros...'
                : `Mostrando ${solicitudesFiltradas.length} registros`}
            </span>
          </div>

          <div className="table-responsive">
            <table className="table dashboard-table mb-0">

              <thead>
                <tr>
                  <th>CÓDIGO</th>
                  <th>CANDIDATO</th>
                  <th>FAMILIA DE CARGO</th>
                  <th>CARGO</th>
                  <th>FECHA</th>
                  <th>ESTADO</th>
                </tr>
              </thead>

              <tbody>

                {loading && (
                  <tr>
                    <td colSpan="6" className="table-message">
                      Cargando solicitudes...
                    </td>
                  </tr>
                )}

                {!loading && solicitudesFiltradas.length === 0 && (
                  <tr>
                    <td colSpan="6" className="table-message">
                      No se encontraron solicitudes.
                    </td>
                  </tr>
                )}

                {!loading && solicitudesFiltradas.map((item) => (
                  <tr key={item.idSolicitud}>
                    <td className="table-code">
                      SOL-{item.idSolicitud}
                    </td>

                    <td className="table-candidate">
                      {item.nombreCandidato || 'Sin candidato'}
                    </td>

                    <td>{item.familiaCargo || '—'}</td>
                    <td>{item.cargo || '—'}</td>
                    <td>{formatearFecha(item.fechaSolicitud)}</td>

                    <td>
                      <span className={`status-badge ${getBadgeStyle(item.estado)}`}>
                        {item.estado || 'Sin estado'}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </section>

        {/* DISTRIBUCIÓN */}
        <section className="dashboard-distribution">

          <h2>SOLICITUDES POR FAMILIA DE CARGO</h2>

          {loading ? (
            <p>Calculando distribución...</p>
          ) : distribucionFamilias.length === 0 ? (
            <p>No hay solicitudes para mostrar.</p>
          ) : (
            <div className="distribution-list">

              {distribucionFamilias.map(([familia, cantidad]) => {
                const porcentaje = totalSolicitudes
                  ? Math.round((cantidad / totalSolicitudes) * 100)
                  : 0;

                return (
                  <div className="distribution-item" key={familia}>

                    <div className="distribution-labels">
                      <span>{familia}</span>
                      <strong>{porcentaje}% ({cantidad})</strong>
                    </div>

                    <div className="progress distribution-track">
                      <div
                        className="progress-bar distribution-bar"
                        role="progressbar"
                        style={{ width: `${porcentaje}%` }}
                        aria-valuenow={porcentaje}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>

        <footer className="dashboard-footer">
          AQUACHILE · SISTEMA DE GESTIÓN DE EVALUACIONES PSICOLABORALES
        </footer>

      </main>
    </div>
  );
}
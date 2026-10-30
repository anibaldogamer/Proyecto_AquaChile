import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ correo, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Correo o contraseña incorrectos.');
        }

        throw new Error('No fue posible iniciar sesión. Inténtalo nuevamente.');
      }

      navigate('/dashboard', { replace: true });

    } catch (err) {
      setError(
        err.message || 'No se pudo conectar con el servidor.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="login-container">
       <section className="login-brand-panel">

        <video
            className="login-background-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/AquaChileLogoBlacno.png"
        >
            <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="login-video-overlay"></div>
        <div className="login-brand-content">

        <img
            src="/AquaChileLogoBlanco.png"
            alt="Logo AquaChile"
            className="login-logo"
        />

        <div className="login-brand-text">
            <h1>Gestión de Evaluaciones</h1>
            <p>
            Gestiona tu trabajo de la mejor manera.
            </p>
        </div>

        <span className="login-brand-footer">
            AQUACHILE · GESTIÓN DE PERSONAS
        </span>

        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-form-wrapper">
          <div className="login-heading">
            <span className="login-eyebrow">
              PORTAL INTERNO
            </span>

            <h2>Bienvenido</h2>

            <p>
              Ingresa tus credenciales para acceder a la plataforma.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="correo" className="form-label">
                Correo electrónico
              </label>

              <input
                id="correo"
                type="email"
                className="form-control login-input"
                placeholder="nombre@aquachile.cl"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>

              <div className="login-password-wrapper">
                <input
                  id="password"
                  type={mostrarPassword ? 'text' : 'password'}
                  className="form-control login-input"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() =>
                    setMostrarPassword(!mostrarPassword)
                  }
                  aria-label={
                    mostrarPassword
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                >
                  {mostrarPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn login-submit-button w-100"
              disabled={cargando}
            >
              {cargando ? 'Ingresando...' : 'Iniciar sesión'}
            </button>


          </form>
          <div className="login-footer-links">
            <span>Acceso exclusivo para personal autorizado.</span>

            <span className="login-footer-divider">|</span>

            <button
              type="button"
              className="login-postulacion-button"
              onClick={() => navigate('/postulacion')}
            >
              Postular a una oferta laboral
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
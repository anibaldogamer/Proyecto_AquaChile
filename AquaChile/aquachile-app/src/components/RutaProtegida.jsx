
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function RutaProtegida({ children }) {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const usuario = await response.json();
          setAutenticado(usuario);
        } else {
          setAutenticado(false);
        }
      } catch (error) {
        console.error('Error al verificar la sesión:', error);
        setAutenticado(false);
      }
    };

    verificarSesion();
  }, []);

  if (autenticado === null) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verificando sesión...</span>
        </div>
      </div>
    );
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaProtegida;

import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import Login from './components/Login';
import RutaProtegida from './components/RutaProtegida';
import DashboardAquaChile from './components/Dashboard';
import FormularioCandidatoAquaChile from './components/FormularioCandidato';

function RutasAplicacion() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <RutaProtegida>
            <DashboardAquaChile
              onNavigateToForm={() => navigate('/candidatos/nuevo')}
            />
          </RutaProtegida>
        }
      />

      <Route
        path="/candidatos/nuevo"
        element={
          <RutaProtegida>
            <FormularioCandidatoAquaChile
              onNavigateToDashboard={() => navigate('/dashboard')}
            />
          </RutaProtegida>
        }
      />

      <Route
        path="/postulacion"
        element={
          <FormularioCandidatoAquaChile modo="publico" />
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <RutasAplicacion />
    </BrowserRouter>
  );
}

export default App;

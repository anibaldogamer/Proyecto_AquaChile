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
import ModuloLayout from './layouts/ModuloLayout';
import DetalleLayout from './layouts/DetalleLayout';
import PerfilEvaluador from './screens/PerfilEvaluador';
import DetalleCandidato from './screens/DetalleCandidato';

function RutasAplicacion() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <RutaProtegida>
            <ModuloLayout><DashboardAquaChile onNavigateToForm={() => navigate('/candidatos/nuevo')} /></ModuloLayout>
          </RutaProtegida>
        }
      />

      <Route path="/evaluador" element={<RutaProtegida><ModuloLayout><PerfilEvaluador /></ModuloLayout></RutaProtegida>} />
      <Route path="/candidatos/:id" element={<RutaProtegida><DetalleLayout><DetalleCandidato onBack={() => navigate('/dashboard')} /></DetalleLayout></RutaProtegida>} />

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

import React, { useState } from 'react';
import DashboardAquaChile from './components/Dashboard';
import FormularioCandidatoAquaChile from './components/FormularioCandidato';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  return (
    <div>
      {currentScreen === 'dashboard' ? (
        <DashboardAquaChile onNavigateToForm={() => setCurrentScreen('form')} />
      ) : (
        <FormularioCandidatoAquaChile onNavigateToDashboard={() => setCurrentScreen('dashboard')} />
      )}
    </div>
  );
}

export default App;
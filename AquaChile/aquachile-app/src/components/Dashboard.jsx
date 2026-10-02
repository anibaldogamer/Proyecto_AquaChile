import React, { useState } from 'react';

export default function DashboardAquaChile({ onNavigateToForm }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamilia, setSelectedFamilia] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');

  // Datos simulados del sistema ERP
  const candidatos = [
    { id: 'REG-8041', nombre: 'Roberto Morales Soto', familia: 'Operaciones Marítimas y Cosecha', cargo: 'Patrón de Embarcación', fecha: '02/10/2026', estado: 'En Evaluación' },
    { id: 'REG-8040', nombre: 'Andrea Silva Paredes', familia: 'Planta de Proceso y Calidad', cargo: 'Analista de Control', fecha: '01/10/2026', estado: 'Apto' },
    { id: 'REG-8039', nombre: 'Carlos Fuentes Ruiz', familia: 'Piscicultura y Alevinaje', cargo: 'Jefe de Centro', fecha: '01/10/2026', estado: 'Pendiente' },
    { id: 'REG-8038', nombre: 'Mariana Godoy Vera', familia: 'Mantenimiento e Ingeniería', cargo: 'Técnico Electromecánico', fecha: '30/09/2026', estado: 'No Apto' },
    { id: 'REG-8037', nombre: 'Felipe Lagos Carrasco', familia: 'Administración, Finanzas y Personas', cargo: 'Generalista RRHH', fecha: '29/09/2026', estado: 'Apto' },
    { id: 'REG-8036', nombre: 'Claudia Araya Méndez', familia: 'Sostenibilidad y Medio Ambiente', cargo: 'Encargada Ambiental', fecha: '28/09/2026', estado: 'En Evaluación' },
  ];

  const getBadgeStyle = (estado) => {
    switch (estado) {
      case 'Apto':
        return 'bg-emerald-50 text-emerald-700 border-emerald-300';
      case 'En Evaluación':
        return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'Pendiente':
        return 'bg-amber-50 text-amber-700 border-amber-300';
      case 'No Apto':
        return 'bg-gray-100 text-gray-600 border-gray-300';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans text-xs">
      
      {/* BARRA SUPERIOR INSTITUCIONAL */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 bg-slate-800 border border-slate-700 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-[#D94E34]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4a1 1 0 0 0 1.25 1.25l1.79-.62A8.94 8.94 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7 0-1.63.56-3.13 1.5-4.34l9.84 9.84A6.94 6.94 0 0 1 12 19z"/>
                </svg>
              </div>
              <span className="font-bold text-sm tracking-tight text-white uppercase">
                Aqua<span className="text-[#D94E34]">Chile</span>
              </span>
            </div>
            <span className="text-slate-400 text-xs border-l border-slate-700 pl-3">
              Módulo de Reclutamiento y Selección
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400 text-xs">Usuario: analista.reclutamiento</span>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        
        {/* ENCABEZADO Y BOTÓN DE ACCIÓN */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-300">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Panel de Control de Selección</h1>
            <p className="text-gray-500 text-xs mt-0.5">Gestión centralizada de postulaciones y evaluaciones psicolaborales.</p>
          </div>
          <button 
            onClick={onNavigateToForm}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded text-xs transition-colors shadow-sm flex items-center space-x-1"
          >
            <span>+ Registrar Nuevo Candidato</span>
          </button>
        </div>

        {/* TARJETAS DE INDICADORES (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 border border-gray-300 rounded shadow-sm">
            <span className="text-gray-500 font-medium text-[11px] uppercase tracking-wider block">Total Candidatos</span>
            <span className="text-2xl font-bold text-gray-900 mt-1 block">148</span>
            <span className="text-[10px] text-emerald-700 mt-1 inline-block">+12% respecto al mes anterior</span>
          </div>

          <div className="bg-white p-4 border border-gray-300 rounded shadow-sm">
            <span className="text-gray-500 font-medium text-[11px] uppercase tracking-wider block">En Evaluación</span>
            <span className="text-2xl font-bold text-slate-800 mt-1 block">32</span>
            <span className="text-[10px] text-gray-500 mt-1 inline-block">8 entrevistas agendadas hoy</span>
          </div>

          <div className="bg-white p-4 border border-gray-300 rounded shadow-sm">
            <span className="text-gray-500 font-medium text-[11px] uppercase tracking-wider block">Candidatos Aptos</span>
            <span className="text-2xl font-bold text-emerald-700 mt-1 block">89</span>
            <span className="text-[10px] text-gray-500 mt-1 inline-block">Tasa de idoneidad: 60.1%</span>
          </div>

          <div className="bg-white p-4 border border-gray-300 rounded shadow-sm">
            <span className="text-gray-500 font-medium text-[11px] uppercase tracking-wider block">CVs Pendientes</span>
            <span className="text-2xl font-bold text-amber-600 mt-1 block">27</span>
            <span className="text-[10px] text-gray-500 mt-1 inline-block">Ingresados esta semana</span>
          </div>
        </div>

        {/* BÚSQUEDA Y FILTROS */}
        <div className="bg-white p-4 border border-gray-300 rounded shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Buscar por candidato, código o cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-slate-500 outline-none"
            />
          </div>

          <div className="flex w-full md:w-auto gap-3">
            <select 
              value={selectedFamilia} 
              onChange={(e) => setSelectedFamilia(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded text-xs bg-white outline-none"
            >
              <option value="">-- Todas las áreas --</option>
              <option value="Operaciones">Operaciones Marítimas</option>
              <option value="Planta">Planta de Proceso</option>
              <option value="Piscicultura">Piscicultura</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>

            <select 
              value={selectedEstado} 
              onChange={(e) => setSelectedEstado(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded text-xs bg-white outline-none"
            >
              <option value="">-- Todos los estados --</option>
              <option value="Apto">Apto</option>
              <option value="En Evaluación">En Evaluación</option>
              <option value="Pendiente">Pendiente</option>
              <option value="No Apto">No Apto</option>
            </select>
          </div>
        </div>

        {/* TABLA PRINCIPAL DE DATOS */}
        <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Listado General de Postulantes</h2>
            <span className="text-[11px] text-gray-500">Mostrando {candidatos.length} registros</span>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-4">Código</th>
                <th className="py-2.5 px-4">Candidato</th>
                <th className="py-2.5 px-4">Familia de Cargo</th>
                <th className="py-2.5 px-4">Cargo Específico</th>
                <th className="py-2.5 px-4">Fecha</th>
                <th className="py-2.5 px-4">Estado</th>
                <th className="py-2.5 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {candidatos.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-gray-500">{item.id}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{item.nombre}</td>
                  <td className="py-3 px-4 text-gray-600">{item.familia}</td>
                  <td className="py-3 px-4 text-gray-800">{item.cargo}</td>
                  <td className="py-3 px-4 text-gray-500 text-[11px]">{item.fecha}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 border rounded text-[10px] font-medium ${getBadgeStyle(item.estado)}`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-slate-700 hover:text-slate-900 font-medium underline text-[11px]">
                      Ver Ficha
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DISTRIBUCIÓN POR ÁREA OPERATIVA */}
        <div className="bg-white p-5 border border-gray-300 rounded shadow-sm">
          <h2 className="font-semibold text-gray-700 uppercase tracking-wider text-[11px] mb-4">Carga de Requerimientos por Área</h2>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-gray-600 mb-1">
                <span>Operaciones Marítimas y Cosecha</span>
                <span className="font-mono">35% (52 postulantes)</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-800 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-600 mb-1">
                <span>Planta de Proceso y Calidad</span>
                <span className="font-mono">28% (41 postulantes)</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-700 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-600 mb-1">
                <span>Piscicultura y Alevinaje</span>
                <span className="font-mono">18% (27 postulantes)</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-600 h-2 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
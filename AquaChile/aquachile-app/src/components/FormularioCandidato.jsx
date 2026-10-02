import React, { useState } from 'react';

export default function FormularioCandidatoAquaChile({ onNavigateToDashboard }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    familiaCargo: '',
    cargoPostula: '',
    cvFile: null,
    observaciones: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const familiasDeCargo = [
    'Operaciones Marítimas y Cosecha',
    'Planta de Proceso y Calidad',
    'Piscicultura y Alevinaje',
    'Mantenimiento e Ingeniería',
    'Administración, Finanzas y Personas',
    'Sostenibilidad y Medio Ambiente'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cvFile: e.target.files[0] });
      if (errors.cvFile) setErrors({ ...errors, cvFile: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'Campo requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'Campo requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'Campo requerido';
    if (!formData.familiaCargo) newErrors.familiaCargo = 'Seleccione una opción';
    if (!formData.cargoPostula.trim()) newErrors.cargoPostula = 'Campo requerido';
    if (!formData.cvFile) newErrors.cvFile = 'Adjunte el archivo de CV';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans text-xs">
      
      {/* BARRA SUPERIOR INSTITUCIONAL */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
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
              Sistema de Gestión de Selección
            </span>
          </div>

          <span className="text-slate-400 text-xs">Usuario: analista.reclutamiento</span>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        
        {/* ENCABEZADO DE SECCIÓN Y BOTÓN VOLVER */}
        <div className="mb-6 pb-3 border-b border-gray-300 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Registro de Candidato</h1>
            <p className="text-gray-500 text-xs mt-0.5">Ingrese los datos para aperturar la ficha de evaluación psicolaboral.</p>
          </div>
          <button 
            type="button" 
            onClick={onNavigateToDashboard}
            className="px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 font-medium transition-colors cursor-pointer"
          >
            Volver al listado
          </button>
        </div>

        {/* NOTIFICACIÓN DE ÉXITO */}
        {isSubmitted && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-medium">
            El candidato ha sido guardado exitosamente en la base de datos.
          </div>
        )}

        {/* FORMULARIO ESTRUCTURADO */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded shadow-sm divide-y divide-gray-200">
          
          {/* SECCIÓN 1: DATOS PERSONALES */}
          <div className="p-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">1. Antecedentes Personales</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nombre completo <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full px-2.5 py-1.5 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded text-xs focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none`}
                  placeholder="Ej: Juan Pérez Morales"
                />
                {errors.nombre && <p className="text-[11px] text-red-600 mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Correo electrónico <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-2.5 py-1.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded text-xs focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none`}
                  placeholder="ejemplo@dominio.cl"
                />
                {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Teléfono de contacto <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={`w-full px-2.5 py-1.5 border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded text-xs focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none`}
                  placeholder="+56 9 1234 5678"
                />
                {errors.telefono && <p className="text-[11px] text-red-600 mt-1">{errors.telefono}</p>}
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: INFORMACIÓN DEL CARGO */}
          <div className="p-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">2. Postulación y Área</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Familia de cargo <span className="text-red-600">*</span>
                </label>
                <select
                  name="familiaCargo"
                  value={formData.familiaCargo}
                  onChange={handleChange}
                  className={`w-full px-2.5 py-1.5 border ${errors.familiaCargo ? 'border-red-500' : 'border-gray-300'} rounded text-xs focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none bg-white`}
                >
                  <option value="">-- Seleccionar --</option>
                  {familiasDeCargo.map((f, i) => (
                    <option key={i} value={f}>{f}</option>
                  ))}
                </select>
                {errors.familiaCargo && <p className="text-[11px] text-red-600 mt-1">{errors.familiaCargo}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Cargo específico <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="cargoPostula"
                  value={formData.cargoPostula}
                  onChange={handleChange}
                  className={`w-full px-2.5 py-1.5 border ${errors.cargoPostula ? 'border-red-500' : 'border-gray-300'} rounded text-xs focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none`}
                  placeholder="Ej: Patrón de Embarcación"
                />
                {errors.cargoPostula && <p className="text-[11px] text-red-600 mt-1">{errors.cargoPostula}</p>}
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: DOCUMENTACIÓN Y NOTAS */}
          <div className="p-6 space-y-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">3. Respaldos y Observaciones</h2>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Curriculum Vitae <span className="text-red-600">*</span>
              </label>
              <div className={`p-2.5 border ${errors.cvFile ? 'border-red-500' : 'border-gray-300'} rounded bg-gray-50 flex items-center justify-between`}>
                <span className="text-xs text-gray-600 truncate">
                  {formData.cvFile ? formData.cvFile.name : 'Formato PDF o DOCX (Máx. 10 MB)'}
                </span>
                <label className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
                  Adjuntar archivo
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              {errors.cvFile && <p className="text-[11px] text-red-600 mt-1">{errors.cvFile}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Observaciones internas
              </label>
              <textarea
                name="observaciones"
                rows="3"
                value={formData.observaciones}
                onChange={handleChange}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none resize-none"
                placeholder="Comentarios adicionales del reclutador..."
              />
            </div>
          </div>

          {/* ACCIONES */}
          <div className="px-6 py-3 bg-gray-50 rounded-b flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onNavigateToDashboard}
              className="px-4 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-slate-800 text-white text-xs font-medium rounded hover:bg-slate-700 transition-colors"
            >
              Guardar Candidato
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}
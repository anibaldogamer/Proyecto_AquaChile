import { useState } from 'react';
import './FormularioCandidato.css';

export default function FormularioCandidatoAquaChile({
  onNavigateToDashboard,
  modo = 'interno',
}) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    familiaCargo: '',
    cargoPostula: '',
    cvFile: null,
    observaciones: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const familiasDeCargo = [
    'Operaciones Marítimas y Cosecha',
    'Planta de Proceso y Calidad',
    'Piscicultura y Alevinaje',
    'Mantenimiento e Ingeniería',
    'Administración, Finanzas y Personas',
    'Sostenibilidad y Medio Ambiente',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleFileChange = (e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    setFormData((prev) => ({
      ...prev,
      cvFile: archivo,
    }));

    setErrors((prev) => ({
      ...prev,
      cvFile: null,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Campo requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Campo requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Campo requerido';
    }

    if (!formData.familiaCargo) {
      newErrors.familiaCargo = 'Seleccione una opción';
    }

    if (!formData.cargoPostula.trim()) {
      newErrors.cargoPostula = 'Campo requerido';
    }

    if (!formData.cvFile) {
      newErrors.cvFile = 'Adjunte el archivo de CV';
    } else {
      const extension = formData.cvFile.name
        .split('.')
        .pop()
        .toLowerCase();

      if (!['pdf', 'docx'].includes(extension)) {
        newErrors.cvFile = 'Solo se permiten archivos PDF o DOCX';
      }

      if (formData.cvFile.size > 10 * 1024 * 1024) {
        newErrors.cvFile = 'El archivo no puede superar los 10 MB';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(false);
    setIsLoading(true);

    try {
      const datos = new FormData();

      datos.append('nombre', formData.nombre.trim());
      datos.append('correo', formData.email.trim());
      datos.append('telefono', formData.telefono.trim());
      datos.append('familiaCargo', formData.familiaCargo);
      datos.append('cargo', formData.cargoPostula.trim());
      datos.append('cvFile', formData.cvFile);

      // Las observaciones solo corresponden al registro interno.
      if (modo === 'interno') {
        datos.append('observaciones', formData.observaciones.trim());
      }

      // Seleccionamos el endpoint según el tipo de formulario.
      const endpoint =
        modo === 'publico'
          ? '/api/postulaciones-publicas'
          : '/api/candidatos';

      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        body: datos,
      });

      if (!response.ok) {
        const detalle = await response.text();
        throw new Error(detalle || `Error HTTP ${response.status}`);
      }

      setIsSubmitted(true);

      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        familiaCargo: '',
        cargoPostula: '',
        cvFile: null,
        observaciones: '',
      });

      const archivoInput = document.getElementById('cvFile');

      if (archivoInput) {
        archivoInput.value = '';
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);

      setErrors({
        envio:
          error.message ||
          'No se pudo enviar el formulario. Inténtelo nuevamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="formulario-aqua">
      <header className="formulario-header">
        <div className="container formulario-header-inner">
          <div className="d-flex align-items-center gap-3">
            <img
              src="/AquaChileLogoBlanco.png"
              alt="AquaChile"
              className="formulario-logo"
            />

            <div className="formulario-divider"></div>

            <span className="formulario-module">
              Módulo de Reclutamiento y Selección
            </span>
          </div>

          {modo === 'interno' && (
            <span className="formulario-user">
              Usuario: analista.reclutamiento
            </span>
          )}
        </div>
      </header>

      <main className="container formulario-main">
        <div className="formulario-heading">
          <div>
            <h1>
              {modo === 'publico'
                ? 'Postulación Laboral'
                : 'Registro de Candidato'}
            </h1>

            <p>
              {modo === 'publico'
                ? 'Complete sus antecedentes para postular a una oportunidad laboral en AquaChile.'
                : 'Ingrese los antecedentes para aperturar la ficha de evaluación psicolaboral.'}
            </p>
          </div>

          {modo === 'interno' && (
            <button
              type="button"
              className="btn formulario-btn-secondary"
              onClick={onNavigateToDashboard}
            >
              Volver al listado
            </button>
          )}
        </div>

        {isSubmitted && (
          <div className="alert alert-success" role="alert">
            {modo === 'publico'
              ? 'Tu postulación ha sido recibida exitosamente y está pendiente de revisión.'
              : 'El candidato, su solicitud y su CV se han registrado exitosamente.'}
          </div>
        )}

        {errors.envio && (
          <div className="alert alert-danger" role="alert">
            {errors.envio}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <section className="formulario-card">
            <div className="formulario-section">
              <h2>1. Antecedentes personales</h2>

              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <label className="form-label">
                    Nombre completo <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                    placeholder="Ej: Juan Pérez Morales"
                  />

                  <div className="invalid-feedback">{errors.nombre}</div>
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label">
                    Correo electrónico <span className="text-danger">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="ejemplo@dominio.cl"
                  />

                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label">
                    Teléfono de contacto <span className="text-danger">*</span>
                  </label>

                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                    placeholder="+56 9 1234 5678"
                  />

                  <div className="invalid-feedback">{errors.telefono}</div>
                </div>
              </div>
            </div>

            <div className="formulario-section">
              <h2>2. Postulación y área</h2>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">
                    Familia de cargo <span className="text-danger">*</span>
                  </label>

                  <select
                    name="familiaCargo"
                    value={formData.familiaCargo}
                    onChange={handleChange}
                    className={`form-select ${errors.familiaCargo ? 'is-invalid' : ''}`}
                  >
                    <option value="">Seleccionar familia</option>

                    {familiasDeCargo.map((familia) => (
                      <option key={familia} value={familia}>
                        {familia}
                      </option>
                    ))}
                  </select>

                  <div className="invalid-feedback">
                    {errors.familiaCargo}
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">
                    Cargo específico <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    name="cargoPostula"
                    value={formData.cargoPostula}
                    onChange={handleChange}
                    className={`form-control ${errors.cargoPostula ? 'is-invalid' : ''}`}
                    placeholder="Ej: Patrón de Embarcación"
                  />

                  <div className="invalid-feedback">
                    {errors.cargoPostula}
                  </div>
                </div>
              </div>
            </div>

            <div className="formulario-section">
              <h2>
                {modo === 'publico'
                  ? '3. Currículum Vitae'
                  : '3. Respaldos y observaciones'}
              </h2>

              <div className="mb-4">
                <label className="form-label">
                  Curriculum Vitae <span className="text-danger">*</span>
                </label>

                <input
                  id="cvFile"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className={`form-control ${errors.cvFile ? 'is-invalid' : ''}`}
                />

                <div className="form-text">
                  Formatos permitidos: PDF o DOCX. Tamaño máximo: 10 MB.
                </div>

                {errors.cvFile && (
                  <div className="invalid-feedback d-block">
                    {errors.cvFile}
                  </div>
                )}
              </div>

              {modo === 'interno' && (
                <div>
                  <label className="form-label">
                    Observaciones internas
                  </label>

                  <textarea
                    name="observaciones"
                    rows="3"
                    value={formData.observaciones}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Comentarios adicionales del reclutador..."
                  />
                </div>
              )}
            </div>

            <div className="formulario-actions">
              {modo === 'interno' && (
                <button
                  type="button"
                  onClick={onNavigateToDashboard}
                  disabled={isLoading}
                  className="btn formulario-btn-secondary"
                >
                  Cancelar
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn formulario-btn-primary"
              >
                {isLoading
                  ? 'Enviando...'
                  : modo === 'publico'
                    ? 'Enviar postulación'
                    : 'Guardar Candidato'}
              </button>
            </div>
          </section>
        </form>

        <footer className="formulario-footer">
          AQUACHILE · GESTIÓN DE RECLUTAMIENTO Y SELECCIÓN
        </footer>
      </main>
    </div>
  );
}

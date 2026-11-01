export default function DetalleCandidato({ candidato = {}, onBack }) {
  return (
    <section className="screen-card" aria-labelledby="detalle-title">
      <h1 id="detalle-title">Detalle del candidato</h1>
      <p className="screen-card__muted">Información de la ficha y antecedentes registrados.</p>
      <dl className="screen-grid">
        <div className="screen-field"><dt>Nombre</dt><dd>{candidato.nombre ?? 'Sin nombre'}</dd></div>
        <div className="screen-field"><dt>Correo</dt><dd>{candidato.correo ?? 'Sin correo'}</dd></div>
        <div className="screen-field"><dt>Teléfono</dt><dd>{candidato.telefono ?? 'Sin teléfono'}</dd></div>
        <div className="screen-field"><dt>Cargo</dt><dd>{candidato.cargo ?? 'Sin cargo'}</dd></div>
      </dl>
      {onBack && <button className="btn btn-outline-primary mt-3" type="button" onClick={onBack}>Volver al listado</button>}
    </section>
  )
}

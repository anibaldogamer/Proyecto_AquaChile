import { useState } from 'react'

export default function PerfilEvaluador({ evaluador = {} }) {
  const [guardado, setGuardado] = useState(false)
  const [nombre, setNombre] = useState(evaluador.nombre ?? 'Analista de evaluación')

  return (
    <section className="screen-card" aria-labelledby="perfil-title">
      <h1 id="perfil-title">Perfil del evaluador</h1>
      <p className="screen-card__muted">Administra tus datos y preferencias de evaluación psicolaboral.</p>
      <form onSubmit={(event) => { event.preventDefault(); setGuardado(true) }}>
        <div className="screen-grid">
          <label className="screen-field">Nombre completo
            <input className="form-control mt-2" value={nombre} onChange={(event) => setNombre(event.target.value)} />
          </label>
          <dl className="screen-field"><dt>Rol</dt><dd>{evaluador.rol ?? 'Evaluador'}</dd></dl>
          <dl className="screen-field"><dt>Correo</dt><dd>{evaluador.correo ?? 'evaluador@aquachile.cl'}</dd></dl>
        </div>
        <button className="btn btn-primary mt-3" type="submit">Guardar cambios</button>
        {guardado && <p className="text-success mt-2" role="status">Perfil actualizado correctamente.</p>}
      </form>
    </section>
  )
}

import { Link, Outlet } from 'react-router-dom'
import '../styles/ModuloLayout.css'

export default function DetalleLayout({ children }) {
  return (
    <div className="detalle-layout">
      <div className="detalle-layout__bar">
        <Link to="/dashboard">← Volver al dashboard</Link>
      </div>
      <main className="modulo-layout__content">{children ?? <Outlet />}</main>
    </div>
  )
}

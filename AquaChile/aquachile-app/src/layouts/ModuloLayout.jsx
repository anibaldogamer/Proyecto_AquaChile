import { Link, Outlet } from 'react-router-dom'
import '../styles/ModuloLayout.css'

export default function ModuloLayout({ children }) {
  return (
    <div className="modulo-layout">
      <header className="modulo-layout__header">
        <Link className="modulo-layout__brand" to="/dashboard">AquaChile</Link>
        <nav aria-label="Navegación principal" className="modulo-layout__nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/evaluador">Perfil evaluador</Link>
        </nav>
      </header>
      <main className="modulo-layout__content">{children ?? <Outlet />}</main>
    </div>
  )
}

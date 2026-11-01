import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import ModuloLayout from '../layouts/ModuloLayout'
import DetalleLayout from '../layouts/DetalleLayout'
import PerfilEvaluador from './PerfilEvaluador'
import DetalleCandidato from './DetalleCandidato'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('pantallas principales', () => {
  it('renderiza el Dashboard y sus controles principales', async () => {
    vi.stubGlobal('fetch', vi.fn((url) => Promise.resolve({
      ok: true,
      json: async () => url.includes('estadisticas') ? { total: 0, pendientes: 0 } : [],
    })))

    renderWithRouter(<Dashboard onNavigateToForm={vi.fn()} />)

    expect(screen.getByRole('heading', { name: /panel de control/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/buscar solicitud/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /listado de solicitudes/i })).toBeInTheDocument()
  })

  it('renderiza el Perfil Evaluador', () => {
    renderWithRouter(<PerfilEvaluador evaluador={{ nombre: 'Ana Pérez', rol: 'EVALUADOR' }} />)

    expect(screen.getByRole('heading', { name: /perfil del evaluador/i })).toBeInTheDocument()
    expect(screen.getByDisplayValue('Ana Pérez')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeInTheDocument()
  })

  it('renderiza el Detalle Candidato', () => {
    renderWithRouter(<DetalleCandidato candidato={{ nombre: 'Juan Pérez', cargo: 'Jefe de planta' }} />)

    expect(screen.getByRole('heading', { name: /detalle del candidato/i })).toBeInTheDocument()
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('Jefe de planta')).toBeInTheDocument()
  })
})

describe('layouts de la aplicación', () => {
  it('renderiza navegación y contenido del layout del módulo', () => {
    renderWithRouter(<ModuloLayout><p>Contenido de prueba</p></ModuloLayout>)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /navegación principal/i })).toBeInTheDocument()
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument()
  })

  it('renderiza el enlace de retorno del layout de detalle', () => {
    renderWithRouter(<DetalleLayout><p>Detalle de prueba</p></DetalleLayout>)

    expect(screen.getByRole('link', { name: /volver al dashboard/i })).toBeInTheDocument()
    expect(screen.getByText('Detalle de prueba')).toBeInTheDocument()
  })
})

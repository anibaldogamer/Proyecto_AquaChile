import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Dashboard from '../components/Dashboard';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Dashboard', () => {
  it('renderiza el panel de control', () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => [],
      })
    ));

    render(
      <MemoryRouter>
        <Dashboard onNavigateToForm={vi.fn()} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /panel de control de selección/i })
    ).toBeInTheDocument();
  });

  it('muestra el botón para registrar un nuevo candidato', () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => [],
      })
    ));

    render(
      <MemoryRouter>
        <Dashboard onNavigateToForm={vi.fn()} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('button', { name: /registrar nuevo candidato/i })
    ).toBeInTheDocument();
  });
});
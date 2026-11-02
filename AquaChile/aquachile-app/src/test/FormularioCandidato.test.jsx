import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import FormularioCandidato from '../components/FormularioCandidato';

afterEach(() => {
  cleanup();
});

describe('FormularioCandidato', () => {
  it('renderiza el formulario de postulación pública', () => {
    render(<FormularioCandidato modo="publico" />);

    expect(
      screen.getByRole('heading', { name: /postulación laboral/i })
    ).toBeInTheDocument();
  });

  it('renderiza el formulario de registro interno', () => {
    render(<FormularioCandidato modo="interno" />);

    expect(
      screen.getByRole('heading', { name: /registro de candidato/i })
    ).toBeInTheDocument();
  });

  it('muestra los campos principales del formulario', () => {
    render(<FormularioCandidato modo="publico" />);

    expect(screen.getByPlaceholderText(/juan pérez morales/i))
      .toBeInTheDocument();

    expect(screen.getByPlaceholderText(/ejemplo@dominio.cl/i))
      .toBeInTheDocument();

    expect(screen.getByPlaceholderText(/\+56 9 1234 5678/i))
      .toBeInTheDocument();
  });

  it('muestra el botón para enviar la postulación', () => {
    render(<FormularioCandidato modo="publico" />);

    expect(
      screen.getByRole('button', { name: /enviar postulación/i })
    ).toBeInTheDocument();
  });
});
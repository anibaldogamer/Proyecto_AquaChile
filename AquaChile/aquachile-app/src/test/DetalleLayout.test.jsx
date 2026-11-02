import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import DetalleLayout from '../layouts/DetalleLayout';

afterEach(() => {
  cleanup();
});

describe('DetalleLayout', () => {
  it('renderiza el contenido dentro del layout', () => {
    render(
      <DetalleLayout>
        <p>Detalle de prueba</p>
      </DetalleLayout>
    );

    expect(
      screen.getByText('Detalle de prueba')
    ).toBeInTheDocument();
  });
});
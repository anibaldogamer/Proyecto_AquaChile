import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import ModuloLayout from '../layouts/ModuloLayout';

afterEach(() => {
  cleanup();
});

describe('ModuloLayout', () => {
  it('renderiza el contenido dentro del layout', () => {
    render(
      <ModuloLayout>
        <p>Contenido de prueba</p>
      </ModuloLayout>
    );

    expect(
      screen.getByText('Contenido de prueba')
    ).toBeInTheDocument();
  });
});
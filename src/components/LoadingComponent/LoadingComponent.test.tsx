import { describe, expect, it } from 'vitest';
import { LoadingComponent } from './LoadingComponent';
import { render, screen } from '@testing-library/react';

describe('SearchField', () => {
  it('should render inputElement', async () => {
    render(<LoadingComponent />);
    const divElement = screen.getByTestId('loading');
    expect(divElement).toBeInTheDocument;
  });
  it('should render inputElement', async () => {
    render(<LoadingComponent />);
    const divElement = screen.getByTestId('loading');
    expect(divElement.textContent).toBe('Loading');
  });
});

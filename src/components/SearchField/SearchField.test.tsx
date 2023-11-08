import { describe, expect, it, vi } from 'vitest';
import { SearchField } from './searchField';
import { fireEvent, render, screen } from '@testing-library/react';

const mockedCallback = vi.fn();

describe('SearchField', () => {
  it('should render inputElement', async () => {
    render(<SearchField value="" onSearch={mockedCallback} />);
    const InputElement = screen.getByPlaceholderText('type your request');
    expect(InputElement).toBeInTheDocument;
  });
  it('should be able to type in input', async () => {
    render(<SearchField value="" onSearch={mockedCallback} />);
    const InputElement = screen.getByPlaceholderText(
      'type your request'
    ) as HTMLInputElement;
    fireEvent.change(InputElement, { target: { value: 'go' } });
    expect(InputElement.value).toBe('go');
  });
  it('input value should keep the same after click', async () => {
    render(<SearchField value="" onSearch={mockedCallback} />);
    const InputElement = screen.getByPlaceholderText(
      'type your request'
    ) as HTMLInputElement;
    const ButtonElement = screen.getByRole('button');
    fireEvent.change(InputElement, { target: { value: 'go' } });
    fireEvent.click(ButtonElement);
    expect(InputElement.value).toBe('go');
  });
});

import { describe, expect, it, vi } from 'vitest';
import { ButtonClassic } from './ButtonClaasic';
import { fireEvent, render, screen } from '@testing-library/react';

const mockedCallback = vi.fn();

describe('ButtonClassic', () => {
  it('renders the button with the correct children', async () => {
    render(<ButtonClassic onClick={mockedCallback}>go</ButtonClassic>);
    const ButtonElement = screen.getByRole('button');
    expect(ButtonElement.textContent).toBe('go');
  });
});

it('renders the button', () => {
  render(<ButtonClassic onClick={mockedCallback}>go</ButtonClassic>);
  const ButtonElement = screen.getByRole('button');
  expect(ButtonElement).toBeInTheDocument();
});

it('calls the onClick handler when the button is clicked', () => {
  render(<ButtonClassic onClick={mockedCallback}>go</ButtonClassic>);
  const ButtonElement = screen.getByRole('button');
  fireEvent.click(ButtonElement);
  expect(mockedCallback).toHaveBeenCalledTimes(1);
});

import { describe, expect, it, vi } from 'vitest';
import { ButtonRounded } from './ButtonRounded';
import { fireEvent, render, screen } from '@testing-library/react';

const mockedCallback = vi.fn();

describe('ButtonClassic', () => {
  it('renders the button with the correct children', async () => {
    render(<ButtonRounded onClick={mockedCallback}>go</ButtonRounded>);
    const ButtonElement = screen.getByRole('button');
    expect(ButtonElement.textContent).toBe('go');
  });
});

it('renders the button', () => {
  render(<ButtonRounded onClick={mockedCallback}>go</ButtonRounded>);
  const ButtonElement = screen.getByRole('button');
  expect(ButtonElement).toBeInTheDocument();
});

it('calls the onClick handler when the button is clicked', () => {
  render(<ButtonRounded onClick={mockedCallback}>go</ButtonRounded>);
  const ButtonElement = screen.getByRole('button');
  fireEvent.click(ButtonElement);
  expect(mockedCallback).toHaveBeenCalledTimes(1);
});

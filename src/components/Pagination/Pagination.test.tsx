import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Pagination component', () => {
  it('updates the URL query parameter when the page changes', () => {
    const onChange = vi.fn();
    const currentPage = 2;
    const total = 30;
    render(
      <Pagination total={total} currentPage={currentPage} onChange={onChange} />
    );

    const page3Button = screen.getByText('3');
    fireEvent.click(page3Button);

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('renders the correct number of buttons based on total and cardsPerPage', () => {
    const total = 30;
    const cardsPerPage = 10;
    const currentPage = 1;

    render(
      <Pagination total={total} currentPage={currentPage} onChange={() => {}} />
    );
    const expectedButtonCount = Math.ceil(total / cardsPerPage) + 2;
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(expectedButtonCount);
  });
});

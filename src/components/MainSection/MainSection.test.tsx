import { render, screen } from '@testing-library/react';
import MainSection from './MainSection';
import { mockResultsCards } from '../../utils/mocks';

describe('MainSection', () => {
  it('renders the specified number of cards', () => {
    render(<MainSection results={mockResultsCards} />);
    const cards = screen.getAllByTestId('Card');
    expect(cards.length).toBe(mockResultsCards.length);
  });

  it('displays "no results" message if no cards are present', () => {
    render(<MainSection results={[]} />);
    const noResultsMessage = screen.getByText('no results');
    expect(noResultsMessage).toBeInTheDocument();
  });
});

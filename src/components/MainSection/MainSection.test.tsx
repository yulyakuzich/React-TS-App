import { render, screen } from '@testing-library/react';
import MainSection from './MainSection';
import { mockResultsCards } from '../../utils/mocks';
import { PersonType } from './types';
import { ReactNode } from 'react';
import { ResultsContext } from '../../context/ResultsContext';

const customRender = (
  ui: ReactNode,
  {
    providerProps,
    ...renderOptions
  }: { providerProps: { value: PersonType[] } }
) => {
  return render(
    <ResultsContext.Provider {...providerProps}>{ui}</ResultsContext.Provider>,
    renderOptions
  );
};
describe('MainSection', () => {
  it('renders the specified number of cards', () => {
    const providerProps = { value: mockResultsCards };
    customRender(<MainSection />, { providerProps });
    const cards = screen.getAllByTestId('Card');
    expect(cards.length).toBe(mockResultsCards.length);
  });

  it('displays "no results" message if no cards are present', () => {
    const providerProps: { value: PersonType[] } = { value: [] };
    customRender(<MainSection />, { providerProps });
    const noResultsMessage = screen.getByText('no results');
    expect(noResultsMessage).toBeInTheDocument();
  });
});

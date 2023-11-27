import { render, screen, waitFor } from '@testing-library/react';
import MainSection from './MainSection';
import { mockResultsCards } from '../../utils/mocks';

import store from '../../store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const MockMainSection = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainSection />
      </BrowserRouter>
    </Provider>
  );
};

describe('MainSection', () => {
  it('renders the specified number of cards', () => {
    render(<MockMainSection />);
    waitFor(() => {
      const cards = screen.getAllByTestId('Card');
      expect(cards.length).toBe(mockResultsCards.length);
    });
  });

  it('displays "no results" message if no cards are present', () => {
    render(<MockMainSection />);
    waitFor(() => {
      const noResultsMessage = screen.getByText(/no results/i);
      expect(noResultsMessage).toBeInTheDocument();
    });
  });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Details from './Details';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { mockPerson } from '../../utils/mocks';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';

vi.mock('axios');
const MockDetails = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    </Provider>
  );
};

describe('Details component', () => {
  it('correctly displays the detailed card data', async () => {
    vi.mocked(axios, true).get.mockResolvedValue({ data: mockPerson });

    await act(async () => {
      render(<MockDetails />);
    });

    const loadingIndicator = screen.queryByTestId('loading-indicator');
    expect(loadingIndicator).not.toBeInTheDocument();

    waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/19 BBY/i)).toBeInTheDocument();
      expect(screen.getByText(/172/i)).toBeInTheDocument();
      expect(screen.getByText(/77/i)).toBeInTheDocument();
      expect(screen.getByText(/fair/i)).toBeInTheDocument();
    });
  });
});

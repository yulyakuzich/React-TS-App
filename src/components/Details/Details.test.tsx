import React from 'react';
import { render, screen } from '@testing-library/react';
import Details from './Details';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { mockPerson } from '../../utils/mocks';
import { BrowserRouter } from 'react-router-dom';

vi.mock('axios');

describe('Details component', () => {
  it('correctly displays the detailed card data', async () => {
    vi.mocked(axios, true).get.mockResolvedValue({ data: mockPerson });

    await act(async () => {
      render(<Details />, { wrapper: BrowserRouter });
    });

    const loadingIndicator = screen.queryByTestId('loading-indicator');
    expect(loadingIndicator).not.toBeInTheDocument();

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/19 BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/172/i)).toBeInTheDocument();
    expect(screen.getByText(/77/i)).toBeInTheDocument();
    expect(screen.getByText(/fair/i)).toBeInTheDocument();
  });
});

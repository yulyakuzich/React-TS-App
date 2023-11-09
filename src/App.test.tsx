import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import LocationDisplay from './App';

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('SearchField component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('saves the entered value to local storage when the Search button is clicked', () => {
    render(<MockApp />);
    const InputElement = screen.getByPlaceholderText('type your request');
    const SearchButton = screen.getByTestId('search-button');

    fireEvent.change(InputElement, { target: { value: 'Test Value' } });
    fireEvent.click(SearchButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'search',
      'Test Value'
    );
  });

  it('retrieves the value from local storage upon mounting', () => {
    localStorageMock.getItem.mockReturnValue('Test Value');

    render(<MockApp />);
    const InputElement = screen.getByPlaceholderText(
      'type your request'
    ) as HTMLInputElement;
    expect(InputElement).toHaveValue('Test Value');
  });
});

describe('Routing', () => {
  it('404 page is displayed when navigating to an invalid route', () => {
    const badRoute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  test('rendering a component that uses useLocation', () => {
    const route = '/some-route';

    render(
      <MemoryRouter initialEntries={[route]}>
        <LocationDisplay />
      </MemoryRouter>
    );

    expect(screen.getByTestId('location-display')).toHaveTextContent(route);
  });
});

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CardComponent, CardComponentProps } from './CardComponent';
import { mockPerson } from '../../utils/mocks';

const MockCardComponent = ({ el, urlParams }: CardComponentProps) => {
  return (
    <BrowserRouter>
      <CardComponent el={el} urlParams={urlParams} />
    </BrowserRouter>
  );
};

describe('CardComponent', () => {
  it('renders the relevant card data', async () => {
    render(<MockCardComponent el={mockPerson} urlParams="" />);

    const NameElement = await screen.findByText(/Luke Skywalker/i);
    const BirthElement = await screen.findByText(/19 BBY/i);
    const HeightElement = await screen.findByText(/172/i);
    const MassElement = await screen.findByText(/77/i);
    const SkinElement = await screen.findByText(/fair/i);

    expect(NameElement).toBeInTheDocument();
    expect(BirthElement).toBeInTheDocument();
    expect(HeightElement).toBeInTheDocument();
    expect(MassElement).toBeInTheDocument();
    expect(SkinElement).toBeInTheDocument();
  });
  //   it('clicking on a card opens a detailed card component;', async () => {
  //     const Route = '/persons/1/';
  //     render(
  //       <MemoryRouter initialEntries={[Route]}>
  //         <App />
  //       </MemoryRouter>
  //     );

  //   })
});

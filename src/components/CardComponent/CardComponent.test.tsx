import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  BrowserRouter,
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { CardComponent, CardComponentProps } from './CardComponent';
import { mockPerson } from '../../utils/mocks';
import Details from '../Details/Details';

const MockCardComponent = ({ el, urlParams }: CardComponentProps) => {
  return (
    <BrowserRouter>
      <CardComponent el={el} urlParams={urlParams} />
    </BrowserRouter>
  );
};

const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <CardComponent el={mockPerson} urlParams="1" />,
    children: [
      {
        path: 'persons/:id',
        element: <Details />,
      },
    ],
  },
];
vi.mock('react-router-dom', async () => {
  const mod: { [key: string]: unknown } =
    await vi.importActual('react-router-dom');
  return {
    ...mod,
    useParams: () => ({
      id: 1,
    }),
  };
});
vi.mock('../../api', async () => {
  const mod: { [key: string]: unknown } = await vi.importActual('../../api');
  return {
    ...mod,
    getPerson: vi.fn(),
  };
});

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
  it('clicking on a card opens a detailed card component'),
    () => {
      const router = createMemoryRouter(routesConfig, {
        initialEntries: ['/'],
      });

      render(<RouterProvider router={router} />);

      const button = screen.getByText('More details');
      fireEvent.click(button);
      waitFor(() => {
        const details = screen.getByRole('details');
        expect(details).toBeDefined();
      });
    };
});

// import { describe, expect, it } from 'vitest';

// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import Details from './Details';
// import { BrowserRouter, Route, Router } from 'react-router-dom';
// import axios from 'axios';

// const mockPerson = {
//   name: 'Luke Skywalker',
//   birth_year: '19 BBY',
//   height: '172',
//   mass: '77',
//   skin_color: 'fair',
//   created: '2023-01-01T00:00:00.000Z',
//   edited: '2023-01-02T00:00:00.000Z',
//   eye_color: 'blue',
//   gender: 'male',
//   hair_color: 'blond',
//   homeworld: 'Tatooine',
// };

// // const MockDetails = () => {
// //   return (
// //     <BrowserRouter>
// //       <Details />
// //     </BrowserRouter>
// //   );
// // };

// vi.mock('axios');
// const axiosMock = axios;

// describe('Details component', () => {
//   it('displays a loading indicator while fetching data', async () => {
//     (axiosMock.get as vi.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockPerson });

//     const history = createMemoryHistory();
//     history.push('/persons/1');

//     render(
//       <Router history={history}>
//         <Route path="/persons/:id" element={<Details />} />
//       </Router>
//     );

//     const loadingIndicator = screen.getByTestId('loading-indicator');

//     // Verify that the loading indicator is initially displayed
//     expect(loadingIndicator).toBeInTheDocument();

//     // Wait for the API call to complete
//     await waitFor(() => {});

//     // Verify that the loading indicator is no longer displayed
//     expect(loadingIndicator).not.toBeInTheDocument();
//   });

//   it('correctly displays the detailed card data', async () => {
//     axiosMock.get.mockResolvedValue({ data: mockPerson });

//     const history = createMemoryHistory();
//     history.push('/persons/1');

//     render(
//       <Router history={history}>
//         <Route path="/persons/:id" element={<Details />} />
//       </Router>
//     );

//     // Wait for the API call to complete
//     await waitFor(() => {});

//     // Verify that the detailed card data is rendered
//     expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
//     expect(screen.getByText(/19 BBY/i)).toBeInTheDocument();
//     expect(screen.getByText(/172/i)).toBeInTheDocument();
//     // Add similar assertions for other properties
//   });

//   it('hides the component when clicking the close button', async () => {
//     axiosMock.get.mockResolvedValue({ data: mockPerson });

//     const history = createMemoryHistory();
//     history.push('/persons/1');

//     render(
//       <Router history={history}>
//         <Route path="/persons/:id" element={<Details />} />
//       </Router>
//     );

//     // Wait for the API call to complete
//     await waitFor(() => {});

//     // Find and click the close button
//     const closeButton = screen.getByTestId('close-button');
//     fireEvent.click(closeButton);

//     // Verify that the component is no longer in the document
//     expect(screen.queryByText(/Luke Skywalker/i)).not.toBeInTheDocument();
//   });
// });
// function createMemoryHistory() {
//   throw new Error('Function not implemented.');
// }

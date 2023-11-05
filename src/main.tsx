import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundery/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Details from './components/Details/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <section>
        <div className="container column">
          <h1 className="error_message">Somethig went wrong</h1>
          <button
            className="button"
            onClick={() => {
              location.reload();
            }}
          >
            Please, refresh page!
          </button>
        </div>
      </section>
    ),
    children: [
      {
        path: 'persons/:id',
        element: <Details />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);

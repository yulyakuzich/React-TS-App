import { getPeople } from './api';
import ErrorButtonLayout from './components/ErrorButtonLayout/errorButtonLayout';
import { useContext, useEffect, useState } from 'react';
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import MainSection from './components/MainSection/MainSection';
import { Pagination } from './components/Pagination/Pagination';
import { LoadingComponent } from './components/LoadingComponent/LoadingComponent';
import { SearchField } from './components/SearchField';
import Details from './components/Details/Details';
import { Page404 } from './components/Page404/Page404';
import { SearchProvider } from './context/SearchProvider';
import { SearchContext } from './context/SearchContext';
import {
  ResultsContext,
  ResultsDispatchContext,
} from './context/ResultsContext';
import { PersonType } from './components/MainSection/types';
import { ResultsProvider } from './context/ResultsProvider';

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

export const AppLayout = () => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const { page } = Object.fromEntries(searchParams);

  const search = useContext(SearchContext);
  const results = useContext(ResultsContext);
  const dispatchResults = useContext(ResultsDispatchContext);

  const searchLocal = search ? search : localStorage.getItem('search') || '';

  const location = useLocation();

  const updateResults = (res: PersonType[]) => {
    dispatchResults && dispatchResults({ type: 'update', items: res });
  };

  useEffect(() => {
    setLoading(true);

    getPeople(search || '', page).then((resp) => {
      updateResults(resp.data.results);
      setTotal(resp.data.count);
      setLoading(false);
    });
  }, [searchLocal, page, search]);

  const handlePageChange = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: page.toString(),
    });
  };

  const selectedItem = location?.pathname.includes('persons');
  return (
    <div className="row app-container">
      <div className={`container ${selectedItem && 'container-compact'}`}>
        <div className="column">
          <img
            className="logo_image"
            src="/star-wars-logo.svg"
            alt="star-wars-logo"
          />
        </div>
        <SearchField />
        {loading ? <LoadingComponent /> : <MainSection />}

        {!loading && results.length !== 0 && (
          <Pagination
            onChange={handlePageChange}
            total={total}
            currentPage={page ? parseInt(page) : 1}
          />
        )}
        <ErrorButtonLayout />
      </div>
      <Outlet />
    </div>
  );
};

export const ErrorEl = () => {
  return (
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
  );
};

export default function App() {
  return (
    <>
      <SearchProvider>
        <ResultsProvider>
          <Routes>
            <Route
              path={'/'}
              element={<AppLayout />}
              errorElement={<ErrorEl />}
            >
              <Route path="persons/:id" element={<Details />} />
            </Route>
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
          <LocationDisplay />
        </ResultsProvider>
      </SearchProvider>
    </>
  );
}

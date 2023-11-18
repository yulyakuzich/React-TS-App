import ErrorButtonLayout from './components/ErrorButtonLayout/errorButtonLayout';
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import MainSection from './components/MainSection/MainSection';
import { Pagination } from './components/Pagination/Pagination';
import { SearchField } from './components/SearchField';
import Details from './components/Details/Details';
import { Page404 } from './components/Page404/Page404';

import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './store';
import { useGetAllPeopleQuery } from './services/api';

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

export const AppLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, search } = Object.fromEntries(searchParams);
  const searchFromSelector = useSelector(
    (state: RootState) => state.search.value
  );

  const { data, isFetching } = useGetAllPeopleQuery({
    page,
    search: search ? search : searchFromSelector,
  });

  const location = useLocation();

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
        <MainSection />

        {!isFetching && data && data.results.length !== 0 && (
          <Pagination
            onChange={handlePageChange}
            total={data ? data.count : 0}
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
      <Provider store={store}>
        <Routes>
          <Route path={'/'} element={<AppLayout />} errorElement={<ErrorEl />}>
            <Route path="persons/:id" element={<Details />} />
          </Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
        <LocationDisplay />
      </Provider>
    </>
  );
}

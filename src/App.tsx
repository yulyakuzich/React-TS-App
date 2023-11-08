import { getPeople } from './api';
import ErrorButtonLayout from './components/ErrorButtonLayout/errorButtonLayout';

import { useEffect, useState } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import MainSection from './components/MainSection/MainSection';
import { Pagination } from './components/Pagination/Pagination';
import { LoadingComponent } from './components/LoadingComponent/LoadingComponent';
import { SearchField } from './components/SearchField/searchField';

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const { search, page } = Object.fromEntries(searchParams);

  const searchLocal = search ? search : localStorage.getItem('search') || '';

  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    getPeople(searchLocal, page).then((resp) => {
      setResults(resp.data.results);
      setTotal(resp.data.count);
      setLoading(false);
    });
  }, [searchLocal, page]);

  const handleSearch = (query: string) => {
    localStorage.setItem('search', query);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      search: query,
      page: '1',
    });
    setLoading(true);
    getPeople(query).then((resp) => {
      setResults(resp.data.results);
      setTotal(resp.data.count);
      setLoading(false);
    });
  };

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
        <SearchField value={searchLocal} onSearch={handleSearch} />
        {loading ? <LoadingComponent /> : <MainSection results={results} />}

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
}

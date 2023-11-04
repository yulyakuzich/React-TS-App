import { getPeople } from './api';
import ErrorButtonLayout from './components/ErrorButtonLayout/errorButtonLayout';
import LoadingComponent from './components/LoadingComponent/loadingComponent';
import { SearchField } from './components/SearchField/searchField';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainSection from './components/MainSection/MainSection';

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchLocal = localStorage.getItem('search') || '';

  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    getPeople(searchLocal).then((resp) => {
      setResults(resp.data.results);
      setLoading(false);
    });
  }, [searchLocal]);

  const handleSearch = (query: string) => {
    localStorage.setItem('search', query);
    setLoading(true);
    getPeople(query).then((resp) => {
      setResults(resp.data.results);
      setLoading(false);
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
        <ErrorButtonLayout />
      </div>
      <Outlet />
    </div>
  );
}

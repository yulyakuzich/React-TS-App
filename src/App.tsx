import { getPeople } from './api';
import ErrorButtonLayout from './components/ErrorButtonLayout/errorButtonLayout';
import LoadingComponent from './components/LoadingComponent/loadingComponent';
import MainSection from './components/MainSection/mainSection';
import { SearchField } from './components/SearchField/searchField';
import { useEffect, useState } from 'react';

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchLocal = localStorage.getItem('search') || '';

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

  return (
    <div className="container">
      <div className="column">
        <img
          className="logo_image"
          src="star-wars-logo.svg"
          alt="star-wars-logo"
        />
      </div>
      <SearchField value={searchLocal} onSearch={handleSearch} />
      {loading ? <LoadingComponent /> : <MainSection results={results} />}
      <ErrorButtonLayout />
    </div>
  );
}

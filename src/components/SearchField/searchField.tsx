import { useContext, useEffect, useState } from 'react';
import { ButtonRounded } from '../UI/Buttons/ButtonRounded/ButtonRounded';
import { SearchIcon } from '../UI/Icons/SearchIcon';
import './style.css';
import {
  SearchContext,
  SearchDispatchContext,
} from '../../context/SearchContext';

export function SearchField() {
  const [request, setRequest] = useState('');

  const search = useContext(SearchContext);
  const dispatchSearch = useContext(SearchDispatchContext);

  useEffect(() => {
    search && setRequest(search);
  }, [search]);

  function handleRequestChange(e: React.FormEvent<HTMLInputElement>): void {
    setRequest((e.target as HTMLInputElement).value);
  }

  function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    dispatchSearch &&
      dispatchSearch({
        type: 'update',
        text: request,
      });
  }
  return (
    <>
      <div className="search_field">
        <form className="search_form">
          <div className="search_container">
            <input
              className="search_input"
              value={request}
              placeholder="type your request"
              onChange={handleRequestChange}
            />
          </div>
          <ButtonRounded
            dataTestid="search-button"
            onClick={handleSubmit}
            icon={<SearchIcon />}
          ></ButtonRounded>
        </form>
      </div>
    </>
  );
}

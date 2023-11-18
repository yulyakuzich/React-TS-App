import { useEffect, useState } from 'react';
import { ButtonRounded } from '../UI/Buttons/ButtonRounded/ButtonRounded';
import { SearchIcon } from '../UI/Icons/SearchIcon';
import './style.css';

import { useDispatch } from 'react-redux';

import { update } from '../../store/searchSlice';
import { useSearchParams } from 'react-router-dom';

export function SearchField() {
  const [request, setRequest] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      search: request,
    });
  };

  const search = Object.fromEntries(searchParams).search;
  const dispatch = useDispatch();

  useEffect(() => {
    search && setRequest(search);
  }, [search]);

  function handleRequestChange(e: React.FormEvent<HTMLInputElement>): void {
    setRequest((e.target as HTMLInputElement).value);
  }

  function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    handleSearchChange();
    dispatch(update(request));
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

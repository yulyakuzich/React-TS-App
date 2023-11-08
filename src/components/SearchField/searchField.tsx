import { useState } from 'react';
import { ButtonRounded } from '../UI/Buttons/ButtonRounded/ButtonRounded';
import { SearchIcon } from '../UI/Icons/SearchIcon';
import { SearchFieldProps } from './types';
import './style.css';

export function SearchField(props: SearchFieldProps) {
  const [request, setRequest] = useState(props.value);

  function handleRequestChange(e: React.FormEvent<HTMLInputElement>): void {
    setRequest((e.target as HTMLInputElement).value);
  }

  function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    props.onSearch(request);
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
            onClick={handleSubmit}
            icon={<SearchIcon />}
          ></ButtonRounded>
        </form>
      </div>
    </>
  );
}

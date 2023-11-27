import { useEffect, useState } from 'react';
import { ButtonRounded } from '../UI/Buttons/ButtonRounded/ButtonRounded';
import { SearchIcon } from '../UI/Icons/SearchIcon';
import styles from './SearchField.module.css';

import { useDispatch } from 'react-redux';

import { update } from '../../store/searchSlice';
import { useRouter } from 'next/router';
// import { useSearchParams } from 'react-router-dom';

export function SearchField() {
  const [request, setRequest] = useState('');

  const router = useRouter();
  const currentUrl = router.pathname;
  const currentQuery = { ...router.query };

  // const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = () => {
    currentQuery['search'] = request;
    currentQuery['page'] = '1';
    router.push({ pathname: currentUrl, query: currentQuery });
  };

  // const search = Object.fromEntries(searchParams).search;
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   search && setRequest(search);
  // }, [search]);

  function handleRequestChange(e: React.FormEvent<HTMLInputElement>): void {
    setRequest((e.target as HTMLInputElement).value);
  }

  function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    handleSearchChange();
    // dispatch(update(request));
  }
  return (
    <>
      <div className={styles.search_field}>
        <form className={styles.search_form}>
          <div className={styles.search_container}>
            <input
              className={styles.search_input}
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

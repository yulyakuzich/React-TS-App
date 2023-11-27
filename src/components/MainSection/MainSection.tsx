import styles from './MainSection.module.css';
import { CardComponent } from '../CardComponent/CardComponent';
import { useGetAllPeopleQuery } from '../../services/api';
// import { useSearchParams } from 'react-router-dom';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useRouter } from 'next/router';

export default function MainSection() {
  // const urlParams = new URLSearchParams(process.location.search);
  // const [searchParams] = useSearchParams();
  // const { page, search } = Object.fromEntries(searchParams);
  // const searchFromSelector = useSelector(
  //   (state: RootState) => state.search.value
  // );

  const router = useRouter();
  console.log(router.query.search);

  const { data, isLoading } = useGetAllPeopleQuery({
    page: (router.query.page as string) || '1',
    search: (router.query.search as string) || '',
  });

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <main className={styles.main}>
      <div className={styles.characters_list}>
        {data && data.results.length == 0 && (
          <div className="column fullwidth column-center no-results-message">
            no results
          </div>
        )}
        {data &&
          data.results.map((el) => (
            <CardComponent
              data-testid="Card"
              el={el}
              urlParams={'urlParams.toString()'}
              key={el.name}
            />
          ))}
      </div>
    </main>
  );
}

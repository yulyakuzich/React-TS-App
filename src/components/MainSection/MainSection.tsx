import './style.css';
import { CardComponent } from '../CardComponent/CardComponent';
import { useGetAllPeopleQuery } from '../../services/api';
import { useSearchParams } from 'react-router-dom';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function MainSection() {
  const urlParams = new URLSearchParams(window.location.search);
  const [searchParams] = useSearchParams();
  const { page, search } = Object.fromEntries(searchParams);
  const searchFromSelector = useSelector(
    (state: RootState) => state.search.value
  );

  const { data, isFetching } = useGetAllPeopleQuery({
    page,
    search: search ? search : searchFromSelector,
  });

  return isFetching ? (
    <LoadingComponent />
  ) : (
    <main>
      <div className="characters_list">
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
              urlParams={urlParams.toString()}
              key={el.name}
            />
          ))}
      </div>
    </main>
  );
}

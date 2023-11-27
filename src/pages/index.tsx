import ErrorButtonLayout from '../components/ErrorButtonLayout/errorButtonLayout';

import MainSection from '../components/MainSection/MainSection';
import { Pagination } from '../components/Pagination/Pagination';
import { SearchField } from '../components/SearchField';
import Details from '../components/Details/Details';
// import { Page404 } from './components/Page404/Page404';

import { Provider, useSelector } from 'react-redux';
import store, { RootState, wrapper } from '../store';
import { peopleApi, useGetAllPeopleQuery } from '../services/api';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    (async (context) => {
      const { query } = context;
      const { search, size, page, details } = query;

      console.log(search, page);

      if (!page) {
        if (context.res) {
          context.res.writeHead(302, { Location: '/?page=1' });
          context.res.end();
        }
      }

      const searchQuery = search?.toString() || '';
      // const pageSize = size?.toString() || basicPageSize;
      const currentPage = page?.toString() || '1';

      const personsList = await store.dispatch(
        peopleApi.endpoints.getAllPeople.initiate({
          page: currentPage,
          search: searchQuery,
        })
      );
      console.log(personsList.data);

      const persons =
        personsList && personsList?.data ? personsList?.data.results : [];
      const personsTotal =
        personsList && personsList?.data ? personsList?.data.count : 1;

      return {
        props: {
          searchQuery,
          persons,
          personsTotal,
          currentPage,
          // pageSize,
          // detailsData,
        },
      };
    }) satisfies GetServerSideProps<{
      searchQuery: string;
      // shows: Shows | undefined;
      // pagesTotal: number;
      // page: string;
      // pageSize: string;
      // detailsData: ShowsProps | null;
    }>
);

export default function AppLayout({
  searchQuery,
  persons,
  personsTotal,
  currentPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const { page, search } = Object.fromEntries(searchParams);
  const searchFromSelector = useSelector(
    (state: RootState) => state.search.value
  );

  const router = useRouter();
  const currentUrl = router.pathname;
  const currentQuery = { ...router.query };

  // const { data, isFetching } = useGetAllPeopleQuery({
  //   page,
  //   search: search ? search : searchFromSelector,
  // });

  // const location = useLocation();

  const handlePageChange = (page: number) => {
    currentQuery['page'] = page.toString();
    router.push({ pathname: currentUrl, query: currentQuery });
  };

  const selectedItem = false;
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

        <Pagination
          onChange={handlePageChange}
          total={personsTotal}
          currentPage={parseInt(currentPage)}
        />
        <ErrorButtonLayout />
      </div>
      {/* <Outlet /> */}
    </div>
  );
}

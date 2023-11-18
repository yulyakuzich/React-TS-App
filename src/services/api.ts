import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PersonType } from '../components/MainSection/types';

interface ListResponse<T> {
  count: number;
  results: T[];
}

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<
      ListResponse<PersonType>,
      { page: string; search: string }
    >({
      query: ({ page = '1', search = '' }) =>
        `people/?page=${page}${search ? '&search=' + search : ''}`,
    }),
    getPeopleById: builder.query<PersonType, string>({
      query: (id) => `people/${id}`,
    }),
  }),
});

export const { useGetAllPeopleQuery, useGetPeopleByIdQuery } = peopleApi;

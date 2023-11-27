import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PersonType } from '../components/MainSection/types';
import { HYDRATE } from 'next-redux-wrapper';

interface ListResponse<T> {
  count: number;
  results: T[];
}

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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

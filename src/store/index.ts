import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import { createWrapper } from 'next-redux-wrapper';
import { peopleApi } from '../services/api';

export const store = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      [peopleApi.reducerPath]: peopleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(peopleApi.middleware),
  });

export default store;

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(store, { debug: true });

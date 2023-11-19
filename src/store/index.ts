import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import { peopleApi } from '../services/api';

const store = configureStore({
  reducer: {
    search: searchReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

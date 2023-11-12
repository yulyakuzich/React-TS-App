import { Dispatch, createContext } from 'react';

export const SearchContext = createContext<string | null>(null);
export const SearchDispatchContext = createContext<Dispatch<{
  type: string;
  text: string;
}> | null>(null);

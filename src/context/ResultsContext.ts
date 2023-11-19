import { Dispatch, createContext } from 'react';
import { PersonType } from '../components/MainSection/types';

export const ResultsContext = createContext<PersonType[]>([]);
export const ResultsDispatchContext = createContext<Dispatch<{
  type: string;
  items: PersonType[];
}> | null>(null);

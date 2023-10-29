import { ReactNode } from 'react';

export type ErrorBounderyState = {
  hasError: boolean;
};
export type ErrorBounderyProps = {
  children: ReactNode;
};

export type PersonType = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string;
  starships: string;
  url: string;
};

export type MainSectionProps = {
  results: PersonType[];
};

export type SearchFieldProps = {
  onSearch: (query: string) => void;
  value: string;
};
export type SearchFieldState = {
  request: string;
};

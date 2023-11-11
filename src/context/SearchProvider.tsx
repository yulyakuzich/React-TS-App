import { ReactNode, useReducer } from 'react';
import { SearchContext, SearchDispatchContext } from './SearchContext';

export function SearchProvider({ children }: { children: ReactNode }) {
  const [search, dispatch] = useReducer(searchReducer, '');

  return (
    <SearchContext.Provider value={search}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}

function searchReducer(search: string, action: { type: string; text: string }) {
  switch (action.type) {
    case 'update': {
      return action.text;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

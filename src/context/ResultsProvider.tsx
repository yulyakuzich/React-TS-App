import { ReactNode, useReducer } from 'react';
import { ResultsContext, ResultsDispatchContext } from './ResultsContext';
import { PersonType } from '../components/MainSection/types';

export function ResultsProvider({ children }: { children: ReactNode }) {
  const [results, dispatch] = useReducer(resultsReducer, []);

  return (
    <ResultsContext.Provider value={results}>
      <ResultsDispatchContext.Provider value={dispatch}>
        {children}
      </ResultsDispatchContext.Provider>
    </ResultsContext.Provider>
  );
}

function resultsReducer(
  items: PersonType[],
  action: { type: string; items: PersonType[] }
) {
  switch (action.type) {
    case 'update': {
      return action.items;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

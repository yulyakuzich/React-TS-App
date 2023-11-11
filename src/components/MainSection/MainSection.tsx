import './style.css';
import { CardComponent } from '../CardComponent/CardComponent';
import { useContext } from 'react';
import { ResultsContext } from '../../context/ResultsContext';

export default function MainSection() {
  const urlParams = new URLSearchParams(window.location.search);

  const results = useContext(ResultsContext);

  return (
    <main>
      <div className="characters_list">
        {results.length == 0 && (
          <div className="column fullwidth column-center no-results-message">
            no results
          </div>
        )}
        {results.map((el) => (
          <CardComponent
            el={el}
            urlParams={urlParams.toString()}
            key={el.name}
          />
        ))}
      </div>
    </main>
  );
}

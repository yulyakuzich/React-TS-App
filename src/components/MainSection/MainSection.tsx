import './style.css';
import { MainSectionProps } from './types';
import { CardComponent } from '../CardComponent/CardComponent';

export default function MainSection(props: MainSectionProps) {
  const urlParams = new URLSearchParams(window.location.search);

  return (
    <main>
      <div className="characters_list">
        {props.results.length == 0 && (
          <div className="column fullwidth column-center no-results-message">
            no results
          </div>
        )}
        {props.results.map((el) => (
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

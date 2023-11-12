import { Link } from 'react-router-dom';
import { PersonType } from '../MainSection/types';
import './style.css';

export type CardComponentProps = {
  el: PersonType;
  urlParams: string;
};

export function CardComponent({ el, urlParams }: CardComponentProps) {
  return (
    <div className="characters_list_item column" data-testid="Card">
      {el.url && (
        <Link
          className="character_link"
          to={`persons/${el.url.replace(
            'https://swapi.dev/api/people/',
            ''
          )}?${urlParams}`}
        >
          <div className="characters_list_item_avatar">
            <img src="/star-wars.svg" alt="" />
          </div>
        </Link>
      )}

      <p className="characters_list_item_name">{el.name}</p>
      <div className="characters_list_item_info">
        <p className="character_detail">
          <strong>Birth year:</strong> {el.birth_year}
        </p>
        <p className="character_detail">
          <strong>Height:</strong> {el.height}
        </p>
        <p className="character_detail">
          <strong>Mass:</strong> {el.mass}
        </p>
        <p className="character_detail">
          <strong>Skin color:</strong> {el.skin_color}
        </p>
      </div>
      {el.url && (
        <Link
          className="character_link"
          to={`persons/${el.url.replace(
            'https://swapi.dev/api/people/',
            ''
          )}?${urlParams.toString()}`}
        >
          More details
        </Link>
      )}
    </div>
  );
}

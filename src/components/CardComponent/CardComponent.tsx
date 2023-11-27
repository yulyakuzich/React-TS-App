// import { Link } from 'react-router-dom';
import Link from 'next/link';
import { PersonType } from '../MainSection/types';
import styles from './CardComponent.module.css';

export type CardComponentProps = {
  el: PersonType;
  urlParams: string;
};

export function CardComponent({ el, urlParams }: CardComponentProps) {
  return (
    <div className={styles.characters_list_item + ' column'} data-testid="Card">
      {el.url && (
        <Link
          className={styles.character_link}
          href={`persons/${el.url.replace(
            'https://swapi.dev/api/people/',
            ''
          )}?${urlParams}`}
        >
          <div className={styles.characters_list_item_avatar}>
            <img src="/star-wars.svg" alt="" />
          </div>
        </Link>
      )}

      <p className={styles.characters_list_item_name}>{el.name}</p>
      <div className={styles.characters_list_item_info}>
        <p className={styles.character_detail}>
          <strong>Birth year:</strong> {el.birth_year}
        </p>
        <p className={styles.character_detail}>
          <strong>Height:</strong> {el.height}
        </p>
        <p className={styles.character_detail}>
          <strong>Mass:</strong> {el.mass}
        </p>
        <p className={styles.character_detail}>
          <strong>Skin color:</strong> {el.skin_color}
        </p>
      </div>
      {el.url && (
        <Link
          className={styles.character_link}
          href={`persons/${el.url.replace(
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

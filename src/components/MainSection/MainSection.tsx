import './style.css';
import { MainSectionProps } from './types';

export default function MainSection(props: MainSectionProps) {
  return (
    <main>
      <div className="characters_list">
        {props.results.map((el) => (
          <div className="characters_list_item column" key={el.name}>
            <div className="characters_list_item_avatar">
              <img src="star-wars.svg" alt="" />
            </div>
            <p className="characters_list_item_name">{el.name}</p>
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
        ))}
      </div>
    </main>
  );
}

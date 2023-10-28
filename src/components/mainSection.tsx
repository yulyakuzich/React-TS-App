import { Component } from 'react';

type PersonType = {
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

type MainSectionProps = {
  results: PersonType[];
};

export default class MainSection extends Component<MainSectionProps> {
  render() {
    return (
      <section>
        <div className="container">
          <div className="characters_list">
            {this.props.results.map((el) => (
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
        </div>
      </section>
    );
  }
}

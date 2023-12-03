import React, { ChangeEvent, useState } from 'react';
import { Countries } from '../../helpers/const';
import { ButtonClassic } from '../../components/UI/Buttons/ButtonClassic/ButtonClaasic';

export default function UncontrolledForm() {
  const [autocompleteItems, setAutocompleteItems] = useState<string[]>([]);
  const [country, setCountry] = useState('');
  console.log(country);

  const handleAutocompleteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
    const newArr: string[] = event.target.value
      ? Countries.filter((el) =>
          el.toLowerCase().includes(event.target.value.toLowerCase())
        )
      : [];
    setAutocompleteItems(newArr);
  };

  const onAutocompleteSelectItem = (el: string) => {
    setCountry(el);
    setAutocompleteItems([]);
  };

  return (
    <main className="container">
      <h1 className="title">Uncontrolled Form</h1>
      <form className="form__comtainer">
        <div className="form__container_field">
          <div className="form__item">
            <label htmlFor="name">
              Name:
              <input type="text" name="name" />
            </label>
          </div>
          <div className="form__item">
            <label htmlFor="age">
              Age:
              <input type="number" />
            </label>
          </div>
          <div className="form__item">
            <label htmlFor="email">
              E-mail:
              <input type="email" />
            </label>
          </div>
          <div className="column form__item">
            Gender:
            <label>
              <input type="radio" />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" />
              Female
            </label>
            <label>
              <input type="radio" name="gender" value="other" />
              Other
            </label>
          </div>
          <div className="autocomplete-container form__item">
            <label htmlFor="country">
              Choose your country:
              <input />
            </label>
            {autocompleteItems && autocompleteItems.length > 0 && (
              <div className="autocomplete-list">
                {autocompleteItems.map((el) => (
                  <div
                    key={el}
                    onClick={() => onAutocompleteSelectItem(el)}
                    onChange={handleAutocompleteChange}
                    className="autocomplete-list-item"
                  >
                    <p>{el}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form__container_field">
          <div className="form__item">
            <label htmlFor="password">
              Password:
              <input type="password" />
            </label>
          </div>
          <div className="form__item">
            <label htmlFor="password_confirm">
              Repeat password:
              <input type="password" />
            </label>
          </div>
        </div>
        <div className="form__container_field">
          <div className="form__item">
            <label>
              accept T&C: <input type="checkbox" />
            </label>
          </div>
          <div className="form__item">
            <label>
              Upload your photo:
              <input type="file" />
            </label>
          </div>
        </div>
        <ButtonClassic type="submit">Submit</ButtonClassic>
      </form>
    </main>
  );
}

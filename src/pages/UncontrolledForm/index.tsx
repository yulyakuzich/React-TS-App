import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Countries } from '../../helpers/const';
import { useNavigate } from 'react-router-dom';
import { ButtonClassic } from '../../components/UI/Buttons/ButtonClassic/ButtonClaasic';
import { schema } from '../../helpers/yup';
import { useDispatch } from 'react-redux';
import { update } from '../../store/searchSlice';
import { toBase64 } from '../ReactHookForm';

export default function UncontrolledForm() {
  const [autocompleteItems, setAutocompleteItems] = useState<string[]>([]);
  const [country, setCountry] = useState('');

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const [nameErr, setNameErr] = useState<string | undefined>(undefined);

  const ageRef = useRef<HTMLInputElement | null>(null);
  const [ageErr, setAgeErr] = useState<string | undefined>(undefined);

  const mailRef = useRef<HTMLInputElement | null>(null);
  const [mailErr, setMailErr] = useState<string | undefined>(undefined);

  const genderRef = useRef<HTMLSelectElement | null>(null);
  const [genderErr, setGenderErr] = useState<string | undefined>(undefined);

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [passwordErr, setPasswordErr] = useState<string | undefined>(undefined);

  const repeatRef = useRef<HTMLInputElement | null>(null);
  const [repeatErr, setRepeatErr] = useState<string | undefined>(undefined);

  const termsRef = useRef<HTMLInputElement | null>(null);
  const [termsErr, setTermsErr] = useState<string | undefined>(undefined);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileErr, setFileErr] = useState<string | undefined>(undefined);

  const countryRef = useRef<HTMLInputElement | null>(null);
  const [countryErr, setCountryErr] = useState<string | undefined>(undefined);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value ? +ageRef.current?.value : undefined,
      email: mailRef.current?.value,
      gender: genderRef.current?.value,
      acceptTC: termsRef.current?.checked,
      password: passwordRef.current?.value,
      password_confirm: repeatRef.current?.value,
      photo: fileRef.current?.files ? fileRef.current.files : undefined,
      country: countryRef.current?.value || '',
    };

    schema
      .validate(formData, { abortEarly: false })
      .then((data) => {
        if (data.photo) {
          toBase64(data.photo[0]).then((res) => {
            const payload = { ...data, photo: res };
            dispatch(update(payload));
            navigate('/');
          });
        }
      })
      .catch((error) => {
        setNameErr(error.errors.find((err: string) => err.includes('name')));
        setAgeErr(error.errors.find((err: string) => err.includes('age')));
        setMailErr(error.errors.find((err: string) => err.includes('email')));
        setGenderErr(
          error.errors.find((err: string) => err.includes('gender'))
        );
        setTermsErr(error.errors.find((err: string) => err.includes('T&C')));
        setPasswordErr(
          error.errors.find((err: string) => err.includes('password '))
        );
        setRepeatErr(error.errors.find((err: string) => err.includes('match')));
        setFileErr(error.errors.find((err: string) => err.includes('picture')));
        setCountryErr(
          error.errors.find((err: string) => err.includes('country'))
        );
      });
  };

  return (
    <main className="container">
      <h1 className="title">Uncontrolled Form</h1>
      <form className="form__comtainer" onSubmit={handleSubmit}>
        <div className="form__container_field">
          <div className="form__item">
            <label htmlFor="name">
              Name:
              <input type="text" name="name" ref={nameRef} />
            </label>
            {nameErr && <p className="error__message">{nameErr}</p>}
          </div>
          <div className="form__item">
            <label htmlFor="age">
              Age:
              <input type="number" ref={ageRef} />
            </label>
            {ageErr && <p className="error__message">{ageErr}</p>}
          </div>
          <div className="form__item">
            <label htmlFor="email">
              E-mail:
              <input type="email" ref={mailRef} />
            </label>
            {mailErr && <p className="error__message">{mailErr}</p>}
          </div>
          <div className="column form__item">
            Gender:
            <label>
              <select
                className="h-[24px] w-full rounded px-4 font-normal text-black"
                ref={genderRef}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            {genderErr && <p className="error__message">{genderErr}</p>}
          </div>
          <div className="autocomplete-container form__item">
            <label htmlFor="country">
              Choose your country:
              <input
                type="text"
                onChange={handleAutocompleteChange}
                value={country}
                ref={countryRef}
              />
            </label>
            {countryErr && <p className="error__message">{countryErr}</p>}
            {autocompleteItems && autocompleteItems.length > 0 && (
              <div className="autocomplete-list">
                {autocompleteItems.map((el) => (
                  <div
                    key={el}
                    onClick={() => onAutocompleteSelectItem(el)}
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
              <input type="password" ref={passwordRef} />
            </label>
            {passwordErr && <p className="error__message">{passwordErr}</p>}
          </div>
          <div className="form__item">
            <label htmlFor="password_confirm">
              Repeat password:
              <input type="password" ref={repeatRef} />
            </label>
            {repeatErr && <p className="error__message">{repeatErr}</p>}
          </div>
        </div>
        <div className="form__container_field">
          <div className="form__item">
            <label>
              accept T&C: <input type="checkbox" ref={termsRef} />
            </label>
            {termsErr && <p className="error__message">{termsErr}</p>}
          </div>
          <div className="form__item">
            <label>
              Upload your photo:
              <input type="file" ref={fileRef} />
            </label>
            {fileErr && <p className="error__message">{fileErr}</p>}
          </div>
        </div>
        <ButtonClassic type="submit">Submit</ButtonClassic>
      </form>
    </main>
  );
}

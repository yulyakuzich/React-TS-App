import { useEffect, useState } from 'react';
import { selectForm, update } from '../../store/searchSlice';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonClassic } from '../../components/UI/Buttons/ButtonClassic/ButtonClaasic';
import { schema } from '../../helpers/yup';
import { Countries } from '../../helpers/const';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  password_confirm: string;
  gender: string;
  acceptTC: boolean;
  photo: FileList | null;
  country: string;
}

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export default function ReactHookForm() {
  const dispatch = useDispatch();
  const { name } = useSelector(selectForm);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  async function onSubmit(data: FormState) {
    if (data.photo) {
      const payload = { ...data, photo: await toBase64(data.photo[0]) };
      dispatch(update(payload));
      reset();
    }
  }

  const [autocompleteItems, setAutocompleteItems] = useState<string[]>([]);

  const country = useWatch({ control, name: 'country' });

  useEffect(() => {
    if (country) {
      const newArr: string[] = country
        ? Countries.filter((el) =>
            el.toLowerCase().includes(country ? country.toLowerCase() : '')
          )
        : [];
      setAutocompleteItems(newArr);
    }
  }, [country]);

  const onAutocompleteSelectItem = (el: string) => {
    setValue('country', el);
    setAutocompleteItems([]);
  };
  return (
    <main className="container">
      <h1 className="title">React Hook Form</h1>
      <form className="form__comtainer" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__container_field">
          <div className="form__item">
            <label htmlFor="name">
              Name:
              <input type="text" {...register('name')} />
            </label>
            {errors.name && (
              <p className="error__message">{errors.name.message}</p>
            )}
          </div>
          <div className="form__item">
            <label htmlFor="age">
              Age:
              <input type="number" {...register('age')} />
            </label>
            {errors.age && (
              <p className="error__message">{errors.age.message}</p>
            )}
          </div>
          <div className="form__item">
            <label htmlFor="email">
              E-mail:
              <input type="email" {...register('email')} />
            </label>
            {errors.email && (
              <p className="error__message">{errors.email.message}</p>
            )}
          </div>
          <div className="column form__item">
            Gender:
            <label>
              <input type="radio" {...register('gender')} value="male" />
              Male
            </label>
            <label>
              <input type="radio" {...register('gender')} value="female" />
              Female
            </label>
            <label>
              <input type="radio" {...register('gender')} value="other" />
              Other
            </label>
            {errors.gender && (
              <p className="error__message">{errors.gender.message}</p>
            )}
          </div>
          <div className="autocomplete-container form__item">
            <label htmlFor="country">
              Choose your country:
              <input {...register('country')} type="text" />
            </label>
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
            {errors.country && (
              <p className="error__message">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className="form__container_field">
          <div className="form__item">
            <label htmlFor="password">
              Password:
              <input type="password" {...register('password')} />
            </label>
            {errors.password && (
              <p className="error__message">{errors.password.message}</p>
            )}
          </div>
          <div className="form__item">
            <label htmlFor="password_confirm">
              Repeat password:
              <input type="password" {...register('password_confirm')} />
            </label>
            {errors.password_confirm && (
              <p className="error__message">
                {errors.password_confirm.message}
              </p>
            )}
          </div>
        </div>
        <div className="form__container_field">
          <div className="form__item">
            <label>
              accept T&C: <input type="checkbox" {...register('acceptTC')} />
            </label>
            {errors.acceptTC && (
              <p className="error__message">{errors.acceptTC.message}</p>
            )}
          </div>
          <div className="form__item">
            <label>
              Upload your photo:
              <input type="file" {...register('photo')} />
            </label>
            {errors.photo && (
              <p className="error__message">{errors.photo.message}</p>
            )}
          </div>
        </div>
        <ButtonClassic type="submit">Submit</ButtonClassic>
      </form>
      <p>{name}</p>
    </main>
  );
}

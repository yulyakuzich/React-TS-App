import { useEffect, useState } from 'react';
import { FormState } from '../../store/searchSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonClassic } from '../../components/UI/Buttons/ButtonClassic/ButtonClaasic';
import { schema } from '../../helpers/yup';
import { Countries } from '../../helpers/const';

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormState> = (data) => {
    console.log(data);
    reset();
  };

  const [autocompleteItems, setAutocompleteItems] = useState<string[]>([]);
  // const [country, setCountry] = useState('');

  useEffect(() => {
    const subscription = watch((value) => {
      const newArr: string[] = value.country
        ? Countries.filter((el) =>
            el
              .toLowerCase()
              .includes(value.country ? value.country.toLowerCase() : '')
          )
        : [];
      setAutocompleteItems(newArr);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // const handleAutocompleteChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setCountry(event.target.value);
  //   const newArr: string[] = event.target.value
  //     ? Countries.filter((el) =>
  //         el.toLowerCase().includes(event.target.value.toLowerCase())
  //       )
  //     : [];
  //   setAutocompleteItems(newArr);
  // };

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
              <input type="radio" {...register('gender')} />
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
          </div>
          <div className="form__item">
            <label htmlFor="password_confirm">
              Repeat password:
              <input
                type="password"
                {...register('password_confirm', {
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Your passwords do no match';
                    }
                  },
                })}
              />
            </label>
          </div>
          {errors.password && (
            <p className="error__message">{errors.password.message}</p>
          )}
        </div>
        <div className="form__container_field">
          <div className="form__item">
            <label>
              accept T&C: <input type="checkbox" {...register('acceptTC')} />
            </label>
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
    </main>
  );
}

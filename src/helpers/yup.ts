import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('name is a required field')
    .matches(/^[A-Z][a-zA-Z]*$/, 'name need first uppercased letter'),
  age: yup.number().min(0).required('age is a required field'),
  email: yup
    .string()
    .email('email is not valid!')
    .required('email is a required field'),
  password: yup
    .string()
    .min(8)
    .max(32)
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9])/,
      'password needs 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    )
    .required('password is a required field'),
  password_confirm: yup
    .string()
    .min(8)
    .max(32)
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9])/,
      'password needs 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    )
    .required('password is a required field')
    .oneOf([yup.ref('password')], 'passwords must match'),

  gender: yup.string().required('gender is a required field'),
  acceptTC: yup
    .bool()
    .required('T&C is a required field')
    .oneOf([true], 'you must accept the T&C'),
  photo: yup
    .mixed<FileList>()
    .required('please upload a picture')
    .test(
      'isSizeCorrect',
      'picture size must be equal or less than 1 MB',
      (value) => {
        if (value[0]) {
          const size: number = value[0].size;
          return size <= 1000000;
        }
      }
    )
    .test(
      'extensionIsOK',
      'picture should have an extension jpg or png',
      (value) => {
        if (value[0]) {
          const type: string = value[0].type;
          return type === 'image/jpg' || type === 'image/png';
        }
      }
    ),
  country: yup.string().required('country is a required field'),
});

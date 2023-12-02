import * as yup from 'yup';

const MAX_FILE_SIZE = 102400;

const validFileExtensions: string[] = ['jpg', 'png'];

function isValidFileType(fileName: string | undefined): boolean {
  return (
    !!fileName &&
    validFileExtensions.indexOf(fileName.split('.').pop()!.toLowerCase()) > -1
  );
}

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/^[A-Z][a-zA-Z]*$/, 'First uppercased letter'),
  age: yup.number().min(0).required('Age is a required field'),
  email: yup
    .string()
    .email('E-mail is not valid!')
    .required('Email is a required field'),
  password: yup
    .string()
    .min(8)
    .max(32)
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9])/,
      '1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    )
    .required('Password is a required field'),
  password_confirm: yup
    .string()
    .min(8)
    .max(32)
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9])/,
      '1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    )
    .required('Password is a required field'),

  gender: yup.string().required('Gender is a required field'),
  acceptTC: yup
    .bool()
    .oneOf([true], 'You must accept the terms and conditions'),
  photo: yup
    .mixed()
    .required('Photo is a required field')
    .test('is-valid-type', 'Not a valid image type', (value) => {
      const file = Array.isArray(value) ? value[0] : value?.[0];
      return isValidFileType(file?.name && file.name.toLowerCase());
    })
    .test(
      'is-valid-size',
      `Max allowed size is ${MAX_FILE_SIZE / 1024}KB`,
      (value) => {
        const file = Array.isArray(value) ? value[0] : value?.[0];
        return !!file && file.size <= MAX_FILE_SIZE;
      }
    ),
  country: yup.string().required('Country is a required field'),
});

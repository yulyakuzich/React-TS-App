import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// enum Gender {
//   male,
//   female,
//   other,
// }

export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  password_confirm: string;
  gender: string;
  acceptTC: boolean | undefined;
  photo: string;
  country: string;
}

const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  password_confirm: '',
  gender: '',
  acceptTC: false,
  photo: '',
  country: '',
};

export const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<FormState>) => {
      state = action.payload;
    },
  },
});

export const { update } = formSlice.actions;

export default formSlice.reducer;
